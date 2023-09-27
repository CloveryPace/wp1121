// Sample diary data
const diaryData = [
  { date: "2023.09.06 (三)", tags: ["school"], mood: "happy", content: "今天完成了一個重要的項目！" },
  { date: "2023.09.05 (二)", tags: ["relationship"], mood: "angry", content: "和朋友吵了一架。" },
  { date: "2023.09.04 (一)", tags: ["club"], mood: "sad", content: "社團活動被取消了。" },
];

const diaryCardsContainer = document.querySelector('.diary-cards');
const addDiaryBtn = document.getElementById('add-diary-btn');
const diaryModal = document.querySelector('.diary-modal');

// templates
const diaryModalTemplate = document.querySelector('#diary-modal-template');
const diaryCardTemplate = document.querySelector('#diary-card-template');

// Function to generate diary cards
function generateDiaryCards() {
  diaryCardsContainer.innerHTML = '';

  diaryData.forEach((diary, index) => {
    const diaryCard = document.createElement('div');
    diaryCard.classList.add('diary-card');
    diaryCard.innerHTML = `
          <p>${diary.date}</p>
          <p>標籤: ${diary.tags.join(', ')}</p>
          <p>心情: ${diary.mood}</p>
      `;

    // Click event to view diary content
    diaryCard.addEventListener('click', () => {
      showDiaryContent(diary, index);
    });

    diaryCardsContainer.appendChild(diaryCard);
  });
}

// Function to display diary content in the modal
function showDiaryContent(diary, index) {
  const diaryForm = document.createElement('div');
  diaryForm.classList.add('diary-form');
  diaryForm.innerHTML = `
      <h2>${diary.date}</h2>
      <p>標籤: ${diary.tags.join(', ')}</p>
      <p>心情: ${diary.mood}</p>
      <textarea id="diary-content" rows="5" cols="40">${diary.content}</textarea>
      <button id="edit-diary-btn">編輯</button>
  `;

  const editDiaryBtn = diaryForm.querySelector('#edit-diary-btn');

  // Click event to switch to edit mode
  editDiaryBtn.addEventListener('click', () => {
    editDiary(diary, index);
  });

  diaryModal.innerHTML = '';
  diaryModal.appendChild(diaryForm);
  diaryModal.style.display = 'flex';
}

// Function to edit diary content
function editDiary(diary, index) {
  console.log(diaryModalTemplate);
  // const template = document.querySelector('.diary-modal-template')
  const diaryForm = diaryModalTemplate.content.cloneNode(true);
  console.log(diary);
  // diaryForm.classList.add('diary-form');

  // Set date
  const datePicker = diaryForm.querySelector('h2.date');
  datePicker.innerText = diary.date;

  // Set tag
  const tagDropdown = diaryForm.querySelector('#tag-dropdown');
  tagDropdown.value = diary.tags.join(', ');

  // Set mood
  const moodDropdown = diaryForm.querySelector('#mood-dropdown');
  moodDropdown.value = diary.mood;

  // Set content
  const contentTextArea = diaryForm.querySelector('#diary-content');
  contentTextArea.innerText = diary.content;

  // const diaryForm2 = document.createElement('div');
  // diaryForm.classList.add('diary-form');
  // diaryForm.innerHTML = `
  //     <h2>${diary.date}</h2>
  //     <p>標籤: ${diary.tags.join(', ')}</p>
  //     <p>心情: ${diary.mood}</p>
  //     <textarea id="diary-content" rows="5" cols="40">${diary.content}</textarea>
  //     <button id="save-diary-btn">儲存</button>
  //     <button id="cancel-diary-btn">取消</button>
  // `;

  const saveDiaryBtn = diaryForm.querySelector('#save-diary-btn');
  const cancelDiaryBtn = diaryForm.querySelector('#cancel-diary-btn');
  const diaryContentTextarea = diaryForm.querySelector('#diary-content');

  // Click event to save edited content
  saveDiaryBtn.addEventListener('click', () => {
    diaryData[index].content = diaryContentTextarea.value;
    generateDiaryCards();
    diaryModal.style.display = 'none';
  });

  // Click event to cancel editing
  cancelDiaryBtn.addEventListener('click', () => {
    diaryModal.style.display = 'none';
  });

  diaryModal.innerHTML = '';
  diaryModal.appendChild(diaryForm);
}

// Function to get the day of the week
function getDayOfWeek(date) {
  const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
  return daysOfWeek[date.getDay()];
}

// Click event to open a blank diary for editing
addDiaryBtn.addEventListener('click', () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} (${getDayOfWeek(today)})`;

  const newDiary = {
    date: formattedDate,
    tags: [],
    mood: '',
    content: '',
  };

  showDiaryContent(newDiary, -1);
});


// Initial generation of diary cards
generateDiaryCards();
