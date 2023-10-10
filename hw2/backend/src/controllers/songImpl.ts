import ListModel from "../models/playlistModel";
import SongModel from "../models/songModel";
import { genericErrorHandler } from "../utils/errors";
import type {
  CreateSongPayload,
  CreateSongResponse,
  GetSongResponse,
  GetSongsResponse,
  UpdateSongPayload,
  UpdateSongResponse,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// express pre-defined的types

export const getSongs = async (_: Request, res: Response<GetSongsResponse>) => {
  try {
    const dbSongs = await SongModel.find({});
    const songs = dbSongs.map((song) => ({
      id: song.id as string,
      title: song.title,
      singer: song.singer,
      link: song.link,
      list_id: song.list_id.toString(),
    }));

    return res.status(200).json(songs);
  } catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
};

export const getSong = async (
  req: Request<{ id: string }>,
  res: Response<GetSongResponse | { error: string }>,
) => {
  try {
    const { id } = req.params;

    const song = await SongModel.findById(id);
    if (!song) {
      return res.status(404).json({ error: "id is invalid" });
    }

    return res.status(200).json({
      id: song.id as string,
      title: song.title,
      singer: song.singer,
      link: song.link,
      list_id: song.list_id.toString(),
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

export const createSong = async (
  req: Request<never, never, CreateSongPayload>, // Request的前兩個參數的型別是never代表這兩個參數永遠不該存在（沒有要傳入的意思）
  res: Response<CreateSongResponse | { error: string }>,
) => {
  try {
    const { title, singer, link, list_id } = req.body;

    // Check if the list exists
    const list = await ListModel.findById(list_id);
    if (!list) {
      return res.status(404).json({ error: "list_id is not valid" });
    }

    const song = await SongModel.create({
      title,
      singer,
      link,
      list_id,
    });

    // Add the Song to the list
    list.songs.push(song._id);
    await list.save(); // 等list存好才往下跑

    return res.status(201).json({
      id: song.id as string,
    });
  } catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
};

export const updateSong = async (
  req: Request<{ id: string }, never, UpdateSongPayload>,
  res: Response<UpdateSongResponse | { error: string }>,
) => {
  // 因為可能需要rollback之前做的事所以需要建立session，把動作包在transaction裡方便rollback
  // Create mongoose transaction
  const session = await SongModel.startSession();
  session.startTransaction();
  // In `updateSong` function, 2 database operations are performed:
  // 1. Update the Song
  // 2. Update the list
  // If one of them fails, we need to rollback the other one.
  // To do that, we need to use mongoose transaction.

  try {
    const { id } = req.params;
    const { title, singer, link, list_id } = req.body;

    // Check if the Song exists
    const oldSong = await SongModel.findById(id);
    if (!oldSong) {
      return res.status(404).json({ error: "id is not valid" });
    }

    // If the user wants to update the list_id, we need to check if the list exists
    if (list_id) {
      // Check if the list exists
      const listExists = await ListModel.findById(list_id);
      if (!listExists) {
        return res.status(404).json({ error: "list_id is not valid" });
      }
    }

    const newSong = await SongModel.findByIdAndUpdate(
      id,
      {
        title,
        singer,
        link,
        list_id,
      },
      { new: true }, // findByIdAndUpdate的參數，代表回傳的是更新後的資料
    );

    if (!newSong) {
      return res.status(404).json({ error: "id is not valid" });
    }

    // If the user wants to update the list_id, we need to update the list as well
    if (list_id) {
      // Remove the Song from the old list
      const oldList = await ListModel.findById(oldSong.list_id);
      if (!oldList) {
        return res.status(404).json({ error: "list_id is not valid" });
      }
      oldList.songs = oldList.songs.filter(
        (SongId) => SongId.toString() !== id,
      );
      await oldList.save();

      // Add the Song to the new list
      const newList = await ListModel.findById(list_id);
      if (!newList) {
        return res.status(404).json({ error: "list_id is not valid" });
      }
      newList.songs.push(newSong.id);
      await newList.save();
    }

    // Commit the transaction
    // This means that all database operations are successful
    await session.commitTransaction();

    return res.status(200).send("OK");
  } catch (error) {
    // Rollback the transaction
    // This means that one of the database operations is failed
    await session.abortTransaction();
    genericErrorHandler(error, res);
  }
};

// Delete a Song
export const deleteSong = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  // Create mongoose transaction
  const session = await SongModel.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Delete the Song from the database
    const deletedSong = await SongModel.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ error: "id is not valid" });
    }

    // Delete the Song from the list
    const list = await ListModel.findById(deletedSong.list_id);
    if (!list) {
      return res.status(404).json({ error: "list_id is not valid" });
    }
    list.songs = list.songs.filter((songId) => songId.toString() !== id);
    await list.save();

    // Commit the transaction
    session.commitTransaction();

    return res.status(200).send("OK");
  } catch (error) {
    session.abortTransaction();
    genericErrorHandler(error, res);
  }
};
