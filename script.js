let btns = document.querySelectorAll(".btns");
let cross =
  '<img width="90" height="90" src="https://img.icons8.com/3d-fluency/188/delete-sign.png" alt="cross"/>';
let circle = '<img width="90" height="90" src="./circle.png" alt="circle"/>';
let turn = cross;
let box = document.querySelector(".box");
let x = document.querySelector(".x");
let y = document.querySelector(".y");
let click = new Audio("./click.mp3");
let win = new Audio("./new-level-142995.mp3");
let redScore = Number(localStorage.getItem("X"));
let yellowScore = Number(localStorage.getItem("Y"));;
let screenX = document.getElementById("scoreX");
let screenY = document.getElementById("scoreY");
let playAgainBtn = document.querySelector(".playAgain")
let changeTurn = () => {
  return turn === cross ? circle : cross;
};
x.style.border = "0.2rem solid #e92331";
let winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let moves = Array(9).fill(null);
function disableAllButtons() {
  btns.forEach((btn) => {
    btn.disabled = true;
  });
}
const restart = ()=>{
  localStorage.removeItem("X")
  localStorage.removeItem("Y")
  location.reload()
}
 playAgainBtn.addEventListener("click", ()=>{
  location.reload()
 })
document.getElementById("scoreX").innerHTML = `<span>${redScore}</span>`;
  document.getElementById("scoreY").innerHTML = `<span>${yellowScore}</span>`;
btns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    click.play();
    if (moves[index] === null) {
      btn.innerHTML = turn;
      moves[index] = turn;
      if (turn === cross) {
        y.style.border = "0.2rem solid #edd349";
        x.style.border = "none";
        btn.style.border = "0.2rem solid #e92331";
        btn.style.boxShadow = "0px 0px 16px 0px #e92331";
        box.style.border = "0.2rem solid #edd349";
        box.style.boxShadow = "0px 0px 83px 0px #edd349";
      } else {
        x.style.border = "0.2rem solid #e92331";
        y.style.border = "none";
        btn.style.border = "0.2rem solid #edd349";
        btn.style.boxShadow = "0px 0px 16px 0px #edd349";

        box.style.border = "0.2rem solid #e92331";
        box.style.boxShadow = "0px 0px 83px 0px #e92331";
      }
      if (checkWinner(moves, turn)) {
        if (turn === cross) {
          let scoreAddedX = document.querySelector(".scoreAddedX");
          redScore += 1;
          localStorage.setItem("X", redScore);
          disableAllButtons();
          win.play();
          x.style.background = "#e92331";
          x.innerHTML = `<h2>Winner</h2>
            <span
              ><img width="90" height="90" src="https://img.icons8.com/3d-fluency/94/prize.png" alt="prize"/></span>
          </div>`;

          y.innerHTML = `<h2>Looser</h2>
            <span
              ><img width="90" height="90" src="https://img.icons8.com/3d-fluency/94/loudly-crying-face-2.png" alt="loudly-crying-face-2"/></span>
          </div>`;
          box.style.border = "0.2rem solid #e92331";
          box.style.boxShadow = "0px 0px 83px 0px #e92331";
          let winningBtn = getWinningButtons();
          winningBtn.forEach((e) => {
            e.style.background = "#e92331";
          });
          scoreAddedX.style.opacity = "1";
          scoreAddedX.style.top = "2.7rem";
          screenX.innerHTML = `<span>${redScore}</span>`;
          playAgainBtn.style.opacity = "1"
          setTimeout(() => {
            scoreAddedX.style.top = "0";
            scoreAddedX.style.opacity = "0";
          }, 2000);

        } else {
          let scoreAddedY = document.querySelector(".scoreAddedY");
          yellowScore += 1;
          localStorage.setItem("Y", yellowScore);
          disableAllButtons();
          win.play();
          y.style.background = "#edd349";
          y.innerHTML = `<h2>Winner</h2>
            <span
              ><img width="90" height="90" src="https://img.icons8.com/3d-fluency/94/prize.png" alt="prize"/></span>
          </div>`;
          x.innerHTML = `<h2>Looser</h2>
          <span
            ><img width="90" height="90" src="https://img.icons8.com/3d-fluency/94/loudly-crying-face-2.png" alt="loudly-crying-face-2"/></span>
        </div>`;
          box.style.border = "0.2rem solid #edd349";
          box.style.boxShadow = "0px 0px 83px 0px #edd349";
          let winningBtn = getWinningButtons();
          winningBtn.forEach((e) => {
            e.style.background = "#edd349";
          });
          scoreAddedY.style.opacity = "1";
          scoreAddedY.style.top = " 2.7rem";
          screenY.innerHTML = `<span>${yellowScore}</span>`;
          playAgainBtn.style.opacity = "1"
          setTimeout(() => {
            scoreAddedY.style.top = "0";
            scoreAddedY.style.opacity = "0";
          }, 2000);
        }
      }
      turn = changeTurn();
    }
  });
});
{
}
// Add a variable to store the winning buttons
let winningButtons = [];

// Modify the checkWinner function to also store the winning buttons
function checkWinner(move, currentTurn) {
  let isWinner = winCondition.some((condition) => {
    let isWinningCombo = condition.every((index) => {
      return move[index] === currentTurn;
    });

    if (isWinningCombo) {
      winningButtons = condition.map((index) => btns[index]);
    }

    return isWinningCombo;
  });

  return isWinner;
}

// Function to get the winning buttons
function getWinningButtons() {
  return winningButtons;
}
