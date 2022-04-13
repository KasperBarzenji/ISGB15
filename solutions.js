/**
 * Förnamn: Kasper
 * Efternamn: Barzenji
 * Initialer:
 * Personummer:
 * Datum:
 * Kurskod:
 * Kursnamn:
 */

"use strict";

addEventListener("load", () => {
  console.log("Loading");
  let KB_btnPrimaryRef = document.querySelector(".btn-primary");
  console.log("BtnPrimary: " + KB_btnPrimaryRef);
  KB_btnPrimaryRef.addEventListener("click", validateForm);
});

function validateForm() {
  let ettP = document.querySelector(".mittp");
  let val = ettP.value;
  console.log("ettP: " + ettP + " Value: " + ettP.textContent);
  console.log("Annat sätt: " + ettP.childNodes[0].nodeName);

  let KB_nickNames = document.querySelectorAll("input[type='text']");
  let KB_color = document.querySelectorAll("input[type='color']");

  returnSameName(KB_nickNames, KB_color);

  //   for (let i = 0; i < KB_nickNames.length; i++) {
  //     let KB_nickValues = KB_nickNames.item(i).value;
  //     console.log("Test: " + KB_nickNames.item(i));
  //     console.log("Values: " + KB_nickNames.item(i).value);
  //     console.log("Lengths: " + KB_nickNames.item(i).value.length);
  //     returnSameName(KB_nickNames);
  //   }
}

function initiateGame() {
  let KB_gameArea = document.querySelector("#gameArea");
  console.log("Game arean: " + KB_gameArea);
  generateGameField(KB_gameArea);
  addListenerToTable();
  let KB_randomNum = Math.round(Math.random() * 1 + 1);
  switch (KB_randomNum) {
    case 1:
      console.log("Player one starts");
      oGameData.currentPlayer = oGameData.nickNamePlayerOne;
      break;
    case 2:
      console.log("Player two starts");
      oGameData.currentPlayer = oGameData.nickNamePlayerTwo;
      break;
    default:
      break;
  }
  oGameData.currentMove = 1;
  swapPlayers();
}

function swapPlayers() {
  let h1Ref = document.querySelector("h1");
  // let text = "Akteul spelare är: " + swapPlayers();
  if (oGameData.currentPlayer == oGameData.nickNamePlayerOne) {
    oGameData.currentPlayer = oGameData.nickNamePlayerTwo;
    h1Ref.textContent = "Aktuel spelare är: " + oGameData.currentPlayer;
    return oGameData.currentPlayer;
  } else if (oGameData.currentPlayer == oGameData.nickNamePlayerTwo) {
    oGameData.currentPlayer = oGameData.nickNamePlayerOne;
    h1Ref.textContent = "Aktuel spelare är: " + oGameData.currentPlayer;
    return oGameData.currentPlayer;
  }
}

function executeMove(e) {
  if (e.target.tagName == "TD") {
    if (oGameData.gameLocked == true) {
      console.log("timer activated..");
      return;
    }
    // let KB_img = e.target
    //   .querySelector("img")
    //   .getAttribute("data-card-inplay", "true");

    let KB_img = e.target.childNodes[0].getAttribute(
      "data-card-inplay",
      "true"
    );

    let parentRef = e.target.querySelector("td");
    let childImg = e.target.querySelector("img");
    console.log("Current move: " + oGameData.currentMove);

    if (childImg.getAttribute("data-card-inplay") == "true") {
      // Togglar
      childImg.classList.toggle("d-none");
      // Kollar om currentMove är 1
      if (oGameData.currentMove === 1) {
        oGameData.firstCard = childImg;
        if (oGameData.firstCard !== null) {
          // oGameData.firstCard.classList.toggle("d-none");
        } else if (oGameData.secondCard !== null) {
          oGameData.secondCard.classList.toggle("d-none");
        }
        oGameData.currentMove = 2;
      } else if (oGameData.currentMove === 2) {
        oGameData.secondCard = childImg;
        if (
          oGameData.firstCard.getAttribute("data-kortid") ===
          oGameData.secondCard.getAttribute("data-kortid")
        ) {
          let player = swapPlayers();
          console.log("Player is = " + player);
          if (oGameData.nickNamePlayerOne == player) {
            console.log("Player one won");

            oGameData.firstCard.style.border =
              "3px solid " + oGameData.colorPlayerOne;
            oGameData.secondCard.style.border =
              "3px solid " + oGameData.colorPlayerOne;

            oGameData.scorePlayerOne++;
          } else if (oGameData.nickNamePlayerTwo == player) {
            console.log("player two won");

            oGameData.firstCard.style.border =
              "3px solid " + oGameData.colorPlayerTwo;
            oGameData.secondCard.style.border =
              "3px solid " + oGameData.colorPlayerTwo;

            oGameData.scorePlayerTwo++;
          }

          oGameData.firstCard.setAttribute("data-card-inplay", "false");
          oGameData.secondCard.setAttribute("data-card-inplay", "false");
          oGameData.firstCard = null;
          oGameData.secondCard = null;
          oGameData.remainingCards -= 2;
          oGameData.currentMove = 1;
        } else {
          oGameData.gameLocked = true;
          setTimeout(() => {
            oGameData.firstCard.classList.toggle("d-none");
            oGameData.secondCard.classList.toggle("d-none");
            oGameData.gameLocked = false;
            oGameData.currentMove = 1;
            swapPlayers();
          }, 1500);
        }
        console.log(
          "Score player one: " +
            oGameData.scorePlayerOne +
            " Score player two: " +
            oGameData.scorePlayerTwo
        );
      }
      if (checkForWinner() != 0) {
        checkScores();
        removeListenerFromTable();
        document.querySelector("form").classList.toggle("d-none");
        document.querySelector("#gameArea").classList.toggle("d-none");
        let names = document.querySelectorAll("input[type='text']");
        let colors = document.querySelectorAll("input[type='color']");
        for (let i = 0; i < 2; i++) {
          names.item(i).value = "";
          colors.item(i).value = "#FFFFFF";
        }
        document.querySelector("h1").textContent = "Fågel-Memory";
      }
    } else {
      console.log("Id value not equal to true!");
    }
  }
}

function checkScores() {
  let h1Ref = document.querySelector("h1");
  let scoreOne = oGameData.scorePlayerOne;
  let scoreTwo = oGameData.scorePlayerTwo;

  let winner = scoreOne > scoreTwo ? scoreOne : scoreTwo;
  let text = "";
  if (winner) {
    text =
      "Winner is player: " + oGameData.nickNamePlayerOne + " Score: " + winner;
  } else {
    text =
      "Winner is player: " + oGameData.nickNamePlayerTwo + " Score: " + winner;
  }

  h1Ref.textContent = text;
}

function returnSameName(nickNames, nickColor) {
  let KB_msgBox = document.querySelector("#errorMsg");
  try {
    if (nickNames[0].value == nickNames[1].value) {
      console.log("Error! Same name");
      throw new Error("Får ej vara samma namn");
    }

    for (let i = 0; i < nickColor.length; i++) {
      if (
        nickColor.item(i).value == "#ffffff" ||
        nickColor.item(i).value == "#000000"
      ) {
        throw new Error("Får ej vara svart eller vit färg");
      }
    }
    KB_msgBox.textContent = "Yay!";
    initGlobalObject();

    oGameData.nickNamePlayerOne = nickNames[0].value;
    oGameData.nickNamePlayerTwo = nickNames[1].value;

    oGameData.colorPlayerOne = nickColor[0].value;
    oGameData.colorPlayerTwo = nickColor[1].value;

    initiateGame();
  } catch (error) {
    KB_msgBox.textContent = error;
  }
}
