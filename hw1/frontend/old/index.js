const diaryItemTemplate = document.querySelector("#diary-item-template");
const diaryList = document.querySelector("#diaries");
const diaryInputDialog = document.querySelector("#diary-input-dialog");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    const diaries = await getDiaries();
    diaries.forEach(diary => renderDiary(diary));
  } catch (error) {
    alert("Failed to load diaries");
  }
}

function setupEventListeners() {
  const addDiaryButton = document.querySelector("#diary-add");
  addDiaryButton.addEventListener("click", async () => {
    try {
      const diary = await createDiary();
      renderDiary(diary);
    } catch (error) {
      alert("Failed to create diary!");
      return;
    }
  })
}

function renderDiary(diary) {

}

function createDiaryElement(diary) {

}

async function deleteDiaryElement(id) {

}

async function getDiaries() {

}

async function createDiary(diary) {

}

async function deleteDiaryById(id) {

}

main();