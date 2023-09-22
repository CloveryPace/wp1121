import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from "../controllers/diaryImpl.js";
import express from "express";

// API的介面，使用者導向
// 簡潔地列出api提供的方法
const router = express.Router();

router.get('/', getDiaries);
router.post('/', createDiary);
router.put('/', updateDiary);
router.delete('/', deleteDiary);

export default router;