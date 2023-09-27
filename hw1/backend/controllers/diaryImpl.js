import DiaryModel from "../models/diaryModel.js";

// API的實作細節，開發者導向
// 透過mongoose建立的Model提供的CRUD方法操作資料庫
export const getDiaries = async (req, res) => {
  try {
    // Find all diaries in db
    const diaries = await DiaryModel.find({});

    return res.status(200).json(diaries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDiary = async (req, res) => {
  const { date, tag, mood, content } = req.body;

  // Check title and description
  if (!date || !tag || !mood || !content) {
    return res
      .status(400)
      .json({ message: "Required fields are missing!" });
  }

  // Create a new diary
  try {
    const newDiary = await DiaryModel.create({
      date,
      tag,
      mood,
      content
    });
    return res.status(201).json(newDiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export const updateDiary = async (req, res) => {
  const { id } = req.params;
  const { date, tag, mood, content } = req.body;

  try {
    // Check if the id is valid
    const existedDiary = await DiaryModel.findById(id);
    if (!existedDiary) {
      return res.status(404).json({ message: "Diary not found!" });
    }

    // Update the todo
    if (date !== undefined) existedDiary.date = date; //!!!!

    if (tag !== undefined) existedDiary.tag = tag;
    if (mood !== undefined) existedDiary.mood = mood;
    if (content !== undefined) existedDiary.content = content;

    // Save the updated todo
    await existedDiary.save();

    // Rename _id to id
    existedDiary.id = existedDiary._id;
    delete existedDiary._id;

    return res.status(200).json(existedDiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a todo
export const deleteDiary = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedDiary = await DiaryModel.findById(id);
    if (!existedDiary) {
      return res.status(404).json({ message: "Diary not found!" });
    }
    // Delete the todo
    await DiaryModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Diary deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
