// const entryForm = document.querySelector("#dialog-form");
const btnSave = document.querySelector("#btn-submit");
const btnCancel = document.querySelector("#btn-cancel");
const btnToggleMode = document.querySelector("#btn-mode");

function main() {
  setUpEventListeners();
}

function setUpEventListeners() {
  btnSave.addEventListener("click", save);
  btnCancel.addEventListener("click", cancel);
  btnToggleMode.addEventListener("click", toggleMode);

}

function save() {
  const diaryTemplate = document.querySelector("#diary-item-template");
  const diaryList = document.querySelector("#diaires");
  const inputTextbox = document.querySelector("#entry");

  const val = inputTextbox.value;
  if (!val) {
    alert("請輸入日記內容");
    return;
  }

  const item = diaryTemplate.content.cloneNode(true);
  const content = item.querySelector(".diary-content");
  content.innerText = val;
  inputTextbox.value = "";
  diaryList.appendChild(item);
}

function cancel() {

}

function toggleMode() {
  const modeSwitch = document.querySelector("#btn-mode");
  if (modeSwitch.innerText === "編輯")
    modeSwitch.innerText = "瀏覽";
  else
    modeSwitch.innerText = "編輯";
}

main();