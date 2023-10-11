import ListModel from '../models/playlistModel';
import SongModel from '../models/songModel';
import { genericErrorHandler } from '../utils/errors';
import type {
  SongData,
  CreateListPayload,
  CreateListResponse,
  GetListsResponse,
  ListData,
  UpdateListPayload,
} from '@lib/shared_types';
import type { Request, Response } from 'express';

// Get all lists
export const getLists = async (_: Request, res: Response<GetListsResponse>) => {
  try {
    const lists = await ListModel.find({});

    const listsToReturn = lists.map((list) => {
      return {
        id: list.id,
        title: list.title,
        description: list.description,
      };
    });

    return res.status(200).json(listsToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a list
export const getList = async (
  req: Request<{ id: string }>,
  res: Response<ListData | { error: string }>,
) => {
  try {
    const { id } = req.params;
    const list = await ListModel.findById(id).populate('songs');
    if (!list) {
      return res.status(404).json({ error: 'id is not valid' });
    }

    return res.status(200).json({
      id: list.id,
      title: list.title,
      description: list.description,
      songs: list.songs as unknown as SongData[],
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Create a list
export const createList = async (
  req: Request<never, never, CreateListPayload>,
  res: Response<CreateListResponse>,
) => {
  try {
    const { id } = await ListModel.create(req.body);
    return res.status(201).json({ id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a list
export const updateList = async (
  req: Request<{ id: string }, never, UpdateListPayload>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Update the list
    const newList = await ListModel.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
      },
      { new: true },
    );

    // If the list is not found, return 404
    if (!newList) {
      return res.status(404).json({ error: 'id is not valid' });
    }

    return res.status(200).send('OK');
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a list
export const deleteList = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  // Create a transaction
  const session = await ListModel.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Delete the list
    const deletedList = await ListModel.findByIdAndDelete(id);

    // If the list is not found, return 404
    if (!deletedList) {
      return res.status(404).json({ error: 'id is not valid' });
    }

    // Delete all the songs in the list
    deletedList.songs.forEach(async (songId) => {
      await SongModel.findByIdAndDelete(songId);
    });

    // Commit the transaction
    await session.commitTransaction();

    return res.status(200).send('OK');
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    genericErrorHandler(error, res);
  }
};