// step:1> Grab all the Buttons first

const btns = document.querySelectorAll(".btn");

// for importing audio file

const audioFile = new Audio("./aa.wav");

//step:2> Grab the display element and make display element as 0

const displayElem = document.querySelector(".disp");
const displayTotl = document.querySelector(".play");
let stringToDisplay = "";
let latestOperator = "";
const operators = ["+", "-", "*", "%", "/", "="];
let decimalAdded = false;

// step:3>>> Loop throught all the buttons

// console.log("btns:", btns);

btns.forEach((btn) => {
  // console.log("btn:", btn.innerHTML);

  // step:4>>> Add click event listener to the button and check what button is being pressed.
  btn.addEventListener("click", () => {
    let clickedButton = btn.innerText;

    // console.log("button pressed=" + clickedButton);
    // step:5>>>>> Get the content of the button and check what button is being pressed
    //Block user to click the operatot if  there is no string and if user press the operator button
    // console.log(operators.includes(clickedButton));
    // console.log(stringToDisplay.length);
    if (operators.includes(clickedButton) && !stringToDisplay.length) {
      return;
    }

    if (clickedButton === "AC") {
      stringToDisplay = "";
      decimalAdded = false;
      return displayResult(""), displayString("");
    }
    if (clickedButton === "←") {
      stringToDisplay = stringToDisplay.slice(0, -1);
      // const lastCharacter = stringToDisplay.slice(-1);
      // console.log(lastCharacter);
      // console.log(stringToDisplay);
      return displayResult(stringToDisplay);
    }
    if (operators.includes(clickedButton)) {
      if (stringToDisplay > 0) {
        // console.log("stringtoDisplay:", stringToDisplay);
        console.log("latestOperator is:", latestOperator);
        const lastCharacter = stringToDisplay.slice(-1);
        // console.log("lastcharacter:", lastCharacter);
        if (operators.includes(lastCharacter)) {
          stringToDisplay = stringToDisplay.slice(0, -1);
          // const lastCharacter = stringToDisplay.slice(-1);
          // console.log("last character" + stringToDisplay);
        }
        latestOperator = clickedButton;
        decimalAdded = false;
      }
    }
    if (clickedButton === "=") {
      const lastCharacter = stringToDisplay.slice(-1);
      // console.log(lastCharacter);
      if (operators.includes(lastCharacter)) {
        stringToDisplay = stringToDisplay.slice(0, -1);
      }
      return "=", displayTotal(stringToDisplay);
    }
    if (clickedButton === ".") {
      if (!decimalAdded) {
        const lastOperatorIndex = stringToDisplay.lastIndexOf(latestOperator);
        const lastNumberSet = stringToDisplay.slice(lastOperatorIndex + 1);
        if (lastNumberSet.includes(".")) {
          return;
        }
        if (!latestOperator && stringToDisplay.includes(".")) {
          return;
        }
        decimalAdded = true;
      } else {
        return;
      }
    }
    stringToDisplay = stringToDisplay + clickedButton;
    // console.log("stringTodispaly:", stringToDisplay);
    displayString(stringToDisplay);
    // displayResult(stringToDisplay);
  });
});

// step:10>> Create a function that handles the display of the element of the screen
const displayString = (value) => {
  displayElem.innerText = "Data: " + value;
};
const displayResult = (value) => {
  displayTotl.innerText = "Ans: " + value || "0";
};
const displayTotal = (value) => {
  const prankedData = sendRandom();
  if (prankedData) {
    audioFile.play();
    displayTotl.style.background = "red";
    setTimeout(() => (displayTotl.style.background = ""), 2000);
  }
  console.log(latestOperator);

  console.log("pranked data is:", prankedData);
  let totalValue = eval(value).toString();
  stringToDisplay = totalValue;
  displayResult(totalValue);
};

const sendRandom = () => {
  let randomNumber = Math.round(Math.random() * 10);
  return randomNumber < 3 ? randomNumber : 0;
};
