let passwordLength = 16;

const textInput = document.querySelector("#password");

const uppercaseCheck = document.querySelector("#uppercase-check");
const numberCheck = document.querySelector("#number-check");
const symbolCheck = document.querySelector("#symbol-check");
const lengthPassword = document.querySelector("#password-length-text");

const indicatorBar = document.querySelector("#security-indicator-bar");

function generatePassword() {
  let chars = "abcdefghjklmnpqrstuvxwyz";
  const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVXWYZ";
  const numbersChars = "123456789";
  const symbolsChars = ":>!?/*-()[]{}";

  if (uppercaseCheck.checked) {
    chars += uppercaseChars;
  }

  if (numberCheck.checked) {
    chars += numbersChars;
  }

  if (symbolCheck.checked) {
    chars += symbolsChars;
  }

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const ran = Math.floor(Math.random() * chars.length);
    password += chars.substring(ran, ran + 1);
  }

  textInput.value = password;

  calculateQuality();

  console.log(password);
}

function calculateQuality() {
  //length * peso1 + uppercase * peso2 + number * peso3 + symbol * peso4
  const percent = Math.round(
    (passwordLength / 64) * 25 +
      (uppercaseCheck.checked ? 15 : 0) +
      (numberCheck.checked ? 25 : 0) +
      (symbolCheck.checked ? 35 : 0)
  );

  if (percent > 69) {
    indicatorBar.classList.remove("critical");
    indicatorBar.classList.remove("warning");
    indicatorBar.classList.add("safe");
  } else if (percent > 50) {
    indicatorBar.classList.add("warning");
    indicatorBar.classList.remove("critical");
    indicatorBar.classList.remove("safe");
  } else {
    indicatorBar.classList.add("critical");
    indicatorBar.classList.remove("warning");
    indicatorBar.classList.remove("safe");
  }

  if (percent >= 100) {
    indicatorBar.classList.add("completed");
  } else {
    indicatorBar.classList.remove("completed");
  }

  indicatorBar.style.width = `${percent}%`;

  console.log(percent);
}

function calculateFontSize() {
  if (passwordLength > 45) {
    textInput.classList.remove("font-xs");
    textInput.classList.remove("font-sm");
    textInput.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    textInput.classList.add("font-xs");
    textInput.classList.remove("font-sm");
    textInput.classList.remove("font-xxs");
  } else if (passwordLength > 22) {
    textInput.classList.remove("font-xs");
    textInput.classList.add("font-sm");
    textInput.classList.remove("font-xxs");
  } else {
    textInput.classList.remove("font-xs");
    textInput.classList.remove("font-sm");
    textInput.classList.remove("font-xxs");
  }
}

function copyPaste() {
  navigator.clipboard.writeText(textInput.value);
  alert("Senha copiada para a área de transferência");
}

const passwordLengthEl = document.querySelector("#password-length");

passwordLengthEl.addEventListener("input", () => {
  passwordLength = passwordLengthEl.value;
  lengthPassword.innerText = passwordLengthEl.value;
  console.log(passwordLength);
  generatePassword();
  calculateFontSize();
});

uppercaseCheck.addEventListener("click", generatePassword);
numberCheck.addEventListener("click", generatePassword);
symbolCheck.addEventListener("click", generatePassword);

const btn = document.querySelector("#copyBtn");
btn.addEventListener("click", copyPaste);

const btn_input = document.querySelector("#copyBtn-2");
btn_input.addEventListener("click", copyPaste);

document.querySelector("#reload").addEventListener("click", generatePassword);

generatePassword();
