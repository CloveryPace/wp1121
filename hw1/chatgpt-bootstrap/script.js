// Sample diary data
const diaryData = [
  { date: "2023.09.06 (三)", tags: ["學業"], mood: "快樂", content: "今天完成了一個重要的項目！" },
  { date: "2023.09.05 (二)", tags: ["人際"], mood: "生氣", content: "和朋友吵了一架。" },
  { date: "2023.09.04 (一)", tags: ["社團"], mood: "難過", content: "社團活動被取消了。" },
];

document.addEventListener("DOMContentLoaded", function () {
  const diaryCardsContainer = document.getElementById("diary-cards");
  const addDiaryBtn = document.getElementById("add-diary-btn");
  const diaryContent = document.querySelector(".diary-content");

  // Function to generate diary cards
  function generateDiaryCards() {
    diaryCardsContainer.innerHTML = "";

    diaryData.forEach((diary, index) => {
      const card = document.createElement("button");
      card.classList.add("list-group-item", "list-group-item-action");
      card.innerHTML = `<div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${diary.date}</h5>
              <small>${diary.mood}</small>
          </div>
          <p class="mb-1">標籤: ${diary.tags.join(", ")}</p>`;

      // Click event to view diary content
      card.addEventListener("click", () => {
        showDiaryContent(diary, index);
      });

      diaryCardsContainer.appendChild(card);
    });
  }

  // Function to display diary content
  function showDiaryContent(diary, index) {
    const content = `<h2>${diary.date}</h2>
          <p>標籤: ${diary.tags.join(", ")}</p>
          <p>心情: ${diary.mood}</p>
          <p>${diary.content}</p>`;

    diaryContent.innerHTML = content;
  }

  // Click event to open a blank diary for editing
  addDiaryBtn.addEventListener("click", () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(
      today.getMonth() + 1
    ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")} (${getDayOfWeek(today)
      })`;

    const newDiary = {
      date: formattedDate,
      tags: [],
      mood: "",
      content: "",
    };

    showDiaryContent(newDiary, -1);
  });

  // Function to get the day of the week
  function getDayOfWeek(date) {
    const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
    return daysOfWeek[date.getDay()];
  }

  // Initial generation of diary cards
  generateDiaryCards();
});
