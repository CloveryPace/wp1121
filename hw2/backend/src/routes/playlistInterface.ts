import {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
} from "../controllers/playlistImpl";
import express from "express";

const router = express.Router();

// GET /api/playlists
router.get("/", getLists);
// GET /api/playlists/:id
router.get("/:id", getList);
// POST /api/playlists
router.post("/", createList);
// PUT /api/playlists/:id
router.put("/:id", updateList);
// DELETE /api/playlists/:id
router.delete("/:id", deleteList);

// export the router
export default router;
