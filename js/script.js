"use strict";

// -----RENDER-----

const btnsWrapper = document.querySelector(".calc__btns");

const btnsIconsArr = [
  "AC",
  '<i class="fa-solid fa-delete-left"></i>',
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
  "division",
  "multiplication",
  "subtraction",
  "addition",
  "equels",
  "dot",
];

function renderBtns() {
  for (let i = 0; i < 18; i++) {
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

inputField.focus();

function undoFocusRemoval() {
  inputField.addEventListener("blur", (event) => {
    event.preventDefault();
    inputField.focus();
  });
}

undoFocusRemoval();

btns.forEach((e) => {
  e.addEventListener("click", () => {
    choiseAction(e.dataset.btnValue);
    showClick(e);
  });
});

function choiseAction(value) {
  switch (value) {
    case "clear":
      inputField.classList.remove("screen__input-field--active");
      outputField.classList.remove("screen__output-field--active");
      clearField();
      break;
    case "delete-last-char":
      deleteLastChar();
      break;
    case "percent":
      inputField.value += "%";
      break;
    case "division":
      inputField.value += "/";
      break;
    case "multiplication":
      inputField.value += "*";
      break;
    case "subtraction":
      inputField.value += "-";
      break;
    case "addition":
      inputField.value += "+";
      break;
    case "dot":
      inputField.value += ".";
      break;
    case "equels":
      inputField.classList.add("screen__input-field--active");
      outputField.classList.add("screen__output-field--active");
      calculateExpression();
      break;
    default:
      showExpression(value);
      break;
  }
}

function showExpression(e) {
  inputField.value += `${e}`;
}

function showResult(e) {
  outputField.innerHTML = `${e}`;
}

function clearField() {
  inputField.value = "";
  outputField.innerHTML = "";
}

function deleteLastChar() {
  const expression = inputField.value.slice(0, -1);
  inputField.value = `${expression}`;
}

function calculateExpression() {
  const expression = inputField.value;

  let moderatedStr = expression,
    muldiv = moderatedStr.match(/(\d+\.?\d*)([\/\*])(\d+\.?\d*)/);

  while (muldiv) {
    const [_, left, operator, right] = muldiv;
    let result;

    if (operator === "*") {
      result = parseFloat(left) * parseFloat(right);
    } else if (operator === "/") {
      result = parseFloat(left) / parseFloat(right);
    }

    moderatedStr = moderatedStr.replace(muldiv[0], result);
    muldiv = moderatedStr.match(/(\d+\.?\d*)([\/\*])(\d+\.?\d*)/);
  }

  const parts = moderatedStr.split(/([+\-])/);
  let result = parseFloat(parts[0]);

  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const operand = parseFloat(parts[i + 1]);

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
    }
  }

  checkNaN(result);
}

function checkNaN(result) {
  if (isNaN(result)) {
    showResult("ERR");
  } else {
    showResult(result);
  }
}

function validateInput(input) {
  input.addEventListener("keypress", function (event) {
    const allowedKeys = /[0-9\/*+-]/;
    const char = String.fromCharCode(event.keyCode);

    if (!allowedKeys.test(char)) {
      event.preventDefault();
    }
  });
}

validateInput(inputField);

// -----STYLES-----

function showClick(e) {
  const btnValue = e.dataset.btnValue;

  if (btnValue != "equels" && btnValue != "clear") {
    e.classList.add("calc__btn--click");
  } else {
    e.classList.add("calc__btn--click-big");
  }

  setTimeout(function () {
    e.classList.remove("calc__btn--click");
    e.classList.remove("calc__btn--click-big");
  }, 250);
}
