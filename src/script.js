const toggleSwitch = document.getElementById("toggle-switch");
let state = 1;

const body = document.querySelector("body");

function count(frame) {
  contador = 0;
  for (let i = 0; i < frame.length; i++) {
    if (["+", "-", "/", "x"].includes(frame[i])) {
      contador++;
    }
  }
  return contador;
}

function calculo(frame, operacao) {
  switch (operacao) {
    case "+":
      resultado = frame.split("+");
      n1 = resultado[0];
      n2 = resultado[1];
      return parseFloat(n1) + parseFloat(n2);
    case "-":
      resultado = frame.split("-");
      n1 = resultado[0];
      n2 = resultado[1];
      return parseFloat(n1) - parseFloat(n2);
    case "x":
      resultado = frame.split("x");
      n1 = resultado[0];
      n2 = resultado[1];
      return parseFloat(n1) * parseFloat(n2);
    case "/":
      resultado = frame.split("/");
      n1 = resultado[0];
      n2 = resultado[1];
      return parseFloat(n1) / parseFloat(n2);
  }
}

toggleSwitch.addEventListener("click", function () {
  state++;
  if (state > 3) state = 1;

  toggleSwitch.classList.remove("state-1", "state-2", "state-3");
  body.classList.remove("state-1", "state-2", "state-3");
  body.classList.add("state-" + state);
  toggleSwitch.classList.add("state-" + state);
});

toggleSwitch.classList.add("state-1");

const btn = document.querySelectorAll(".keyboard button");
const frame = document.querySelector(".result");
let operacoes = [];
function frameOutput(event) {
  const value = event.target.value;
  const valuesNotFrame = ["DEL", "Reset", "="];
  const operation = ["+", "-", "/", "x"];

  if (frame.innerText === "0") {
    frame.innerText = "";
  }

  if (!valuesNotFrame.includes(value)) {
    frame.innerText += value;
  }

  if (value === "Reset") {
    frame.innerText = "0";
    operacoes = [];
  }

  if (value === "DEL") {
    n = frame.innerText.length;
    lastLetter = frame.innerText.slice(-1);
    frame.innerText = frame.innerText.substring(0, n - 1);
    if (operation.includes(lastLetter)) {
      operacoes = [];
    }
  }

  if (operation.includes(value)) {
    operacoes.push(value);
  }

  if (count(frame.innerText) == 2) {
    lastLetter = frame.innerText.slice(-1);
    result = calculo(frame.innerText.slice(0, -1), operacoes[0]);
    operacoes.shift();
    frame.innerText = result + lastLetter;
  }

  if (value === "=") {
    console.log(frame.innerText);
    result = calculo(frame.innerText, operacoes[0]);
    operacoes = [];
    frame.innerText = result;
  }
}
btn.forEach((item) => item.addEventListener("click", frameOutput));
