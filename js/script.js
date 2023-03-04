"use strict";

// -----RENDER-----

const btnsWrapper = document.querySelector(".calc__btns");

const btnsIconsArr = [
  "AC",
  '<i class="fa-solid fa-delete-left"></i>',
  '<i class="fa-solid fa-percent"></i>',
  '<i class="fa-solid fa-divide"></i>',
  '<i class="fa-solid fa-xmark"></i>',
  '<i class="fa-solid fa-minus"></i>',
  '<i class="fa-solid fa-plus"></i>',
  '<i class="fa-solid fa-equals"></i>',
  ".",
];

const mathOperatorsArr = [
  "clear",
  "delete-last-char",
  "percent",
  "division",
  "multiplication",
  "subtraction",
  "addition",
  "equels",
];

function renderBtns() {
  for (let i = 0; i < 19; i++) {
    switch (i < btnsIconsArr.length) {
      case true:
        btnsWrapper.innerHTML += ` <div  class="calc__btn ${mathOperatorsArr[i]}" data-btn-value=${mathOperatorsArr[i]}> ${btnsIconsArr[i]} </div>`;
        break;
      case false:
        btnsWrapper.innerHTML += `
        <div  class="calc__btn" data-btn-value=${i - btnsIconsArr.length}> ${
          i - btnsIconsArr.length
        } </div>`;
        break;
    }
  }
}

renderBtns();

// -----LOGiC-----

const btns = [...document.querySelectorAll(".calc__btn")],
  inputField = document.querySelector(".screen__input-field"),
  outputField = document.querySelector(".screen__output-field");

btns.forEach((e) => {
  e.addEventListener("click", () => {
    choiseAction(e.attributes[1].value);
  });
});

function choiseAction(value) {
  switch (value) {
    case "clear":
      clearField();
      break;
    case "delete-last-char":
      deleteLastChar();
      break;
    case "percent":
      inputField.innerHTML += "%";
      break;
    case "division":
      inputField.innerHTML += "/";
      break;
    case "multiplication":
      inputField.innerHTML += "*";
      break;
    case "subtraction":
      inputField.innerHTML += "-";
      break;
    case "addition":
      inputField.innerHTML += "+";
      break;
    case "equels":
      inputField.classList.add("screen__input-field--active");
      outputField.classList.add("screen__output-field--active");
      calculateExpresion();

      break;
    default:
      showExpresion(value);
      break;
  }
}

function showExpresion(e) {
  inputField.innerHTML += `${e}`;
}

function showResult(e) {
  outputField.innerHTML = `${e}`;
}

function clearField() {
  inputField.innerHTML = "";
  outputField.innerHTML = "";
}

function deleteLastChar() {
  const expresion = inputField.innerHTML.slice(0, -1);
  inputField.innerHTML = `${expresion}`;
}

function calculateExpresion() {
  const expresion = inputField.innerHTML;
  const parts = expresion.split(/([\/\+\-\*%])/);
  let result = parseFloat(parts[0]);

  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const operand = parseFloat(parts[i + 1]);
    switch (operator) {
      case "/":
        result /= operand;
        break;
      case "+":
        result += operand;
        break;
      case "-":
        if (parts[i + 2] === "%") {
          result -= (result * operand) / 100;
          i++;
        } else {
          result -= operand;
        }
        break;
      case "*":
        result *= operand;
        break;
      case "%":
        result %= operand;
        break;
    }
  }
  showResult(result);
}
