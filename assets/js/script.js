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
  const percent = Math.round((passwordLength / 64) * 100);

  indicatorBar.style.width = `${percent}%`;

  console.log(percent);
}

function copyPaste() {
  navigator.clipboard.writeText(textInput.value);
}

const passwordLengthEl = document.querySelector("#password-length");

passwordLengthEl.addEventListener("input", () => {
  passwordLength = passwordLengthEl.value;
  lengthPassword.innerText = passwordLengthEl.value;
  console.log(passwordLength);
  generatePassword();
});

uppercaseCheck.addEventListener("click", generatePassword);
numberCheck.addEventListener("click", generatePassword);
symbolCheck.addEventListener("click", generatePassword);

const btn = document.querySelector("#copyBtn");
btn.addEventListener("click", copyPaste);

const btn_input = document.querySelector("#copyBtn-2");
btn_input.addEventListener("click", copyPaste);

generatePassword();
