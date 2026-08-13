import {
  auth,
  db,
  signInAnonymously
} from "./firebase.js";

import {
  ref,
  set,
  get,
  onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";


const gamePinElement = document.getElementById("gamePin");
const playersElement = document.getElementById("players");
const playerCountElement = document.getElementById("playerCount");
const startButton = document.getElementById("startButton");

let gamePin = null;


// Create a random 6-digit PIN
function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


// Find a PIN that is not already being used
async function createUniquePin() {

  let pin;
  let exists = true;

  while (exists) {

    pin = generatePin();

    const roomRef = ref(db, "rooms/" + pin);
    const snapshot = await get(roomRef);

    exists = snapshot.exists();
  }

  return pin;
}


// Create the game room
async function createGame() {

  try {

    // Sign the host into Firebase anonymously
    const userCredential = await signInAnonymously(auth);

    const hostId = userCredential.user.uid;


    // Generate unused room PIN
    gamePin = await createUniquePin();


    // Create room in Firebase
    await set(ref(db, "rooms/" + gamePin), {

      hostId: hostId,

      status: "lobby",

      createdAt: Date.now(),

      players: {}

    });


    // Show PIN on screen
    gamePinElement.textContent = gamePin;


    // Watch players joining
    watchPlayers();

  }

  catch (error) {

    console.error(error);

    gamePinElement.textContent = "خطأ";

    alert("حدث خطأ أثناء إنشاء اللعبة.");

  }
}


// Watch the player list live
function watchPlayers() {

  const playersRef =
    ref(db, "rooms/" + gamePin + "/players");


  onValue(playersRef, (snapshot) => {

    playersElement.innerHTML = "";

    const players = snapshot.val() || {};

    const playerIds = Object.keys(players);


    // Player count
    playerCountElement.textContent = playerIds.length;


    if (playerIds.length === 0) {

      playersElement.innerHTML = `
        <div class="waiting">
          في انتظار انضمام اللاعبين...
        </div>
      `;

      startButton.disabled = true;

      return;
    }


    // Show every player
    playerIds.forEach((playerId) => {

      const player = players[playerId];

      const playerBox = document.createElement("div");

      playerBox.className = "player";

      playerBox.textContent = player.name;

      playersElement.appendChild(playerBox);

    });


    // Allow host to start once someone joins
    startButton.disabled = false;

  });
}


// We will add the quiz start logic later
startButton.addEventListener("click", () => {

  alert("ممتاز! سنربط زر بدء اللعبة بالأسئلة في الخطوة القادمة.");

});


// Start automatically when host.html opens
createGame();
