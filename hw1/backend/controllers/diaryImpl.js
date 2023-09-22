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
};

export const updateDiary = async () => {

};

export const deleteDiary = async () => {

};
