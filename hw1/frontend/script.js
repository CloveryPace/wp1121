// Sample diary data
const diaryData = [
  { id: 1, date: "2023.09.06 (三)", tag: "school", mood: "happy", content: "今天完成了一個重要的項目！" },
  { id: 2, date: "2023.09.05 (二)", tag: "relationship", mood: "angry", content: "和朋友吵了一架。" },
  { id: 3, date: "2023.09.04 (一)", tag: "club", mood: "sad", content: "社團活動被取消了。" },
  { id: 4, date: "2023.09.04 (一)", tag: "club", mood: "sad", content: "社團活動被取消了。" },
  { id: 5, date: "2023.09.04 (一)", tag: "club", mood: "sad", content: "社團活動被取消了。" },
  { id: 6, date: "2023.09.04 (一)", tag: "club", mood: "sad", content: "社團活動被取消了。" },
  { id: 7, date: "2023.09.04 (一)", tag: "club", mood: "sad", content: "社團活動被取消了。" },
];

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
  const addDiaryBtn = document.getElementById('add-diary-btn');
  addDiaryBtn.addEventListener("click", addDiary);
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
  alert("add");
  // const title = todoInput.value;
  // const description = todoDescriptionInput.value;
  // if (!title) {
  //   alert("Please enter a todo title!");
  //   return;
  // }
  // if (!description) {
  //   alert("Please enter a todo description!");
  //   return;
  // }
  // try {
  //   const todo = await createTodo({ title, description });
  //   renderTodo(todo);
  // } catch (error) {
  //   console.log(error.message);
  //   alert("Failed to create todo!");
  //   return;
  // }
}

// Function to generate diary cards
function generateDiaryCards() {
  diaryCardsContainer.innerHTML = '';

  diaryData.forEach((diary, index) => {
    // uploadDiary({date, tag, mood, content});
    // renderDiary(diary, index);

    renderDiary(diary);

    // const diaryCard = document.createElement('div');
    // diaryCard.classList.add('diary-card');
    // diaryCard.innerHTML = `
    //       <p>${diary.date}</p>
    //       <p>標籤: ${diary.tag.join(', ')}</p>
    //       <p>心情: ${diary.mood}</p>
    //   `;

    // // Click event to view diary content
    // diaryCard.addEventListener('click', () => {
    //   openViewModal(diary, index);
    // });

    // diaryCardsContainer.appendChild(diaryCard);
  });
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
  container.id = "diary-card-" + diary.id;
  console.log(container.id);
  console.log(diary);

  // Set date on diary card
  const itemDate = item.querySelector("p.diary-date");
  itemDate.innerText = diary.date;

  // Set tag on diary card
  const itemTag = item.querySelector("p.diary-tag");
  itemTag.innerText = diary.tag;

  // Set mood on diary card
  const itemMood = item.querySelector("p.diary-mood");
  itemMood.innerText = diary.mood;

  // Set content on diary card
  const itemContent = item.querySelector("p.diary-content");
  itemContent.innerText = diary.content;

  item.addEventListener("click", openViewModal(diary))
  return item;

}
// Function to display diary content in the modal
function openViewModal(diary, index) {
  /*
  const diaryForm = document.createElement('div');
  diaryForm.classList.add('diary-form');
  diaryForm.innerHTML = `
      <h2>${diary.date}</h2>
      <p>標籤: ${diary.tag.join(', ')}</p>
      <p>心情: ${diary.mood}</p>
      <textarea id="diary-content" rows="5" cols="40">${diary.content}</textarea>
      <button id="edit-diary-btn">編輯</button>
      `;
  */

  // get diary by id
  // try {
  //   const diary = await getDiary(id);
  // } catch()

  const viewForm = viewModalTemplate.content.cloneNode(true);
  // Set date
  const dateView = viewForm.querySelector('h2.date');
  dateView.innerText = diary.date;

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
    openEditModal(diary, index);
  });

  diaryModal.innerHTML = '';
  diaryModal.appendChild(viewForm);
  diaryModal.style.display = 'flex';
}

// Function to edit diary content
function openEditModal(diary, index) {
  // const template = document.querySelector('.diary-modal-template')
  const editForm = editModalTemplate.content.cloneNode(true);

  // Set date
  const datePicker = editForm.querySelector('h2.date');
  datePicker.innerText = diary.date;

  // Set tag
  const tagDropdown = editForm.querySelector('#tag-dropdown');
  tagDropdown.value = diary.tag;

  // Set mood
  const moodDropdown = editForm.querySelector('#mood-dropdown');
  moodDropdown.value = diary.mood;

  // Set content
  const contentTextArea = editForm.querySelector('#diary-content');
  contentTextArea.innerText = diary.content;

  // const diaryForm2 = document.createElement('div');
  // diaryForm.classList.add('diary-form');
  // diaryForm.innerHTML = `
  //     <h2>${diary.date}</h2>
  //     <p>標籤: ${diary.tag.join(', ')}</p>
  //     <p>心情: ${diary.mood}</p>
  //     <textarea id="diary-content" rows="5" cols="40">${diary.content}</textarea>
  //     <button id="save-diary-btn">儲存</button>
  //     <button id="cancel-diary-btn">取消</button>
  // `;

  const saveBtn = editForm.querySelector('#save-diary-btn');
  const cancelBtn = editForm.querySelector('#cancel-diary-btn');
  const diaryContentTextarea = editForm.querySelector('#diary-content');
  const viewBtn = editForm.querySelector('#view-diary-btn');

  // Click event to save edited content
  saveBtn.addEventListener('click', () => {
    diaryData[index].content = diaryContentTextarea.value;
    generateDiaryCards();
    diaryModal.style.display = 'none';
  });

  // Click event to cancel editing
  cancelBtn.addEventListener('click', () => {
    diaryModal.style.display = 'none';
  });

  // Click event to go back to view modal
  viewBtn.addEventListener('click', () => {
    diaryModal.style.display = 'none';
    openViewModal();
  });

  diaryModal.innerHTML = '';
  diaryModal.appendChild(editForm);
}

// Function to get the day of the week
function getDayOfWeek(date) {
  const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
  return daysOfWeek[date.getDay()];
}

function formatDate(date) {
}

// Click event to open a blank diary for editing
addDiaryBtn.addEventListener('click', () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} (${getDayOfWeek(today)})`;

  const newDiary = {
    date: formattedDate,
    tag: '',
    mood: '',
    content: '',
  };

  openEditModal(newDiary, -1);
});


// Initial generation of diary cards
console.log(instance);
generateDiaryCards();
// main();