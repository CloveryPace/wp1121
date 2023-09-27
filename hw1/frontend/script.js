const diaryCardsContainer = document.querySelector('.diary-cards');
const addDiaryBtn = document.getElementById('add-diary-btn');
const diaryModal = document.querySelector('.diary-modal');

// templates
const editModalTemplate = document.querySelector('#edit-modal-template');
const viewModalTemplate = document.querySelector('#view-modal-template');
const diaryCardTemplate = document.querySelector('#diary-card-template');

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    const diaries = await getDiaries();
    diaries.forEach((diary) => renderDiary(diary));
  } catch (error) {
    console.log(error.message);
    alert("Failed to load diaries!");
  }
}

function setupEventListeners() {
  const addDiaryBtn = document.querySelector('#add-diary-btn');
  addDiaryBtn.addEventListener("click", () => {
    const today = new Date();

    const newDiary = {
      date: today,
      tag: 'school',
      mood: 'happy',
      content: '',
    };

    openEditModal(newDiary, -1);
  });
}

async function getDiaries() {
  try {
    const response = await instance.get("/diary");
    return response.data;
  }
  catch (error) {
    console.log(error.message);
  }
}

// 新增日記
async function addDiary() {

  const editForm = document.querySelector("#edit-form");

  // Get date
  const datePicker = editForm.querySelector('#date-input');
  const date = datePicker.valueAsDate;

  // Get tag
  const tagDropdown = editForm.querySelector('#tag-dropdown');
  const tag = tagDropdown.value;

  // Get mood
  const moodDropdown = editForm.querySelector('#mood-dropdown');
  const mood = moodDropdown.value;

  // Get content
  const contentTextArea = editForm.querySelector('#diary-content');
  const content = contentTextArea.value;

  // Chech Fields Validity
  if (!date) {
    alert("Please choose the date of your diary!");
    return;
  }
  if (!tag) {
    alert("Please choose the tag of your diary!");
    return;
  }
  if (!mood) {
    alert("Please choose the mood of your diary!");
    return;
  }
  if (!content) {
    alert("Some content is needed for a diary!");
    return;
  }

  try {
    const obj = { date, tag, mood, content };
    const diary = await uploadDiary(obj);
    renderDiary(diary);
  } catch (error) {
    console.log(error.message);
    alert("Failed to create diary!");
    return;
  }
}

async function uploadDiary(diaryObj) {
  const response = await instance.post("/diary", diaryObj);
  return response.data;
}

// 讓頁面上出現日記卡
function renderDiary(diary) {
  const item = createDiaryElement(diary); // 產生日記卡元素
  diaryCardsContainer.appendChild(item); // 把元素放到頁面上
}

// 產生日記卡元素
function createDiaryElement(diary) {
  const item = diaryCardTemplate.content.cloneNode(true);
  const container = item.querySelector(".diary-card");
  container.id = diary.id;
  console.log(container.id);

  // Set date on diary card
  const itemDate = item.querySelector("p.diary-date");
  itemDate.innerText = formatDate(diary.date);

  // Set tag on diary card
  const itemTag = item.querySelector("p.diary-tag");
  itemTag.innerText = diary.tag;

  // Set mood on diary card
  const itemMood = item.querySelector("p.diary-mood");
  itemMood.innerText = diary.mood;

  // Set content on diary card
  const itemContent = item.querySelector("p.diary-content");
  itemContent.innerText = diary.content;

  // Set view button listener
  const viewBtn = item.querySelector(".open-diary-btn");
  viewBtn.addEventListener("click", () => {
    openViewModal(diary)
  });

  return item;
}
// Function to display diary content in the modal
function openViewModal(diary) {

  // get diary by id
  // try {
  //   const diary = await getDiary(id);
  // } catch()

  const viewForm = viewModalTemplate.content.cloneNode(true);
  // Set date
  const dateView = viewForm.querySelector('#date-view');
  dateView.innerText = formatDate(diary.date);

  // Set tag
  const tagView = viewForm.querySelector('p#tag-view');
  tagView.innerText = diary.tag;

  // Set mood
  const moodView = viewForm.querySelector('p#mood-view');
  moodView.innerText = diary.mood;

  // Set content
  const contentTextArea = viewForm.querySelector('#diary-content-view');
  contentTextArea.innerText = diary.content;
  contentTextArea.readOnly = true;

  const editBtn = viewForm.querySelector('#edit-diary-btn');

  // Click event to switch to edit mode
  editBtn.addEventListener('click', () => {
    openEditModal(diary);
  });

  diaryModal.innerHTML = '';
  diaryModal.appendChild(viewForm);
  diaryModal.style.display = 'flex';
}

// Function to edit diary content
function openEditModal(diary) {
  // const template = document.querySelector('.diary-modal-template')
  const editForm = editModalTemplate.content.cloneNode(true);

  // // Set date
  // const dateHeader = editForm.querySelector('h2.date');
  // dateHeader.innerText = formatDate(diary.date);

  // Set date
  const datePicker = editForm.querySelector('#date-input');
  datePicker.valueAsDate = new Date(diary.date);

  // Set tag
  const tagDropdown = editForm.querySelector('#tag-dropdown');
  tagDropdown.value = diary.tag;

  // Set mood
  const moodDropdown = editForm.querySelector('#mood-dropdown');
  moodDropdown.value = diary.mood;

  // Set content
  const contentTextArea = editForm.querySelector('#diary-content');
  contentTextArea.innerText = diary.content;

  const saveBtn = editForm.querySelector('#save-diary-btn');
  const cancelBtn = editForm.querySelector('#cancel-diary-btn');
  const viewBtn = editForm.querySelector('#view-diary-btn');

  // Click event to save edited content
  saveBtn.addEventListener('click', () => {
    // diaryData[index].content = diaryContentTextarea.value;
    // generateDiaryCards();
    addDiary();
    // updateDiaryStatus(diary.id, diary);
    diaryModal.style.display = 'none';
  });

  // Click event to cancel editing
  cancelBtn.addEventListener('click', () => {
    diaryModal.style.display = 'none';
  });

  // Click event to go back to view modal
  viewBtn.addEventListener('click', () => {
    diaryModal.style.display = 'none';
    openViewModal(diary, -1);
  });

  diaryModal.innerHTML = '';
  diaryModal.appendChild(editForm);
  diaryModal.style.display = 'flex';

}

// Function to get the day of the week
function getDayOfWeek(date) {
  const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
  return daysOfWeek[date.getDay()];
}

function formatDate(date) {
  const parsedDate = new Date(date);
  return `${parsedDate.getFullYear()}.${String(parsedDate.getMonth() + 1).padStart(2, '0')}.${String(parsedDate.getDate()).padStart(2, '0')} (${getDayOfWeek(parsedDate)})`;
}

// Click event to open a blank diary for editing
addDiaryBtn.addEventListener('click', () => {
  const today = new Date();

  const newDiary = {
    date: today,
    tag: '',
    mood: '',
    content: '',
  };

  openEditModal(newDiary);
});

main();