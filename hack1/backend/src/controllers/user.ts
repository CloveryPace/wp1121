import { User, Users } from '@shared/types';
import { Request, Response } from 'express';
import { Schema } from 'mongoose';
import { ErrorResponse, asyncWrapper } from '@/error';
import UserModel from '@/models/user';

/**
 * Get all users
 * @route GET /api/users
 */
export const getUsers = asyncWrapper(
  async (
    req: Request,
    res: Response<Users.Get.Response<Schema.Types.ObjectId>>,
  ) => {
    const users = await UserModel.find({});
    res.json(users);
  },
);

/**
 * Create new user
 * @route POST /api/users
 * @route POST /api/users/new
 * @route POST /api/auth/register
 */
export const createUser = asyncWrapper(
  async (
    req: Request<{}, {}, User.Post.Payload>,
    res: Response<User.Post.Response<Schema.Types.ObjectId>>,
  ) => {
    /* TODO 1.5: Ensure User Registration Functions Properly (8%) */
    /* Create new user using `UserModel` */
    /* Return 201 with new user */
    const { username, password } = req.body;
    try {
      const user = await UserModel.create({ username, password });
      return res.status(201).json({
        _id: user._id as Schema.Types.ObjectId,
        username: user.username,
        sex: user.sex,
        bio: user.bio,
        image: user.image,
        upvotes: user.upvotes,
        downvotes: user.downvotes,
        posts: user.posts,
      });
    } catch {
      throw new Error('`createUser` Not Implemented');
    }
    /* End of TODO 1.5 */
  },
);

/**
 * Get user by id
 * @route GET /api/users/:id
 */
export const getUser = asyncWrapper(
  async (
    req: Request<{ id: string }>,
    res: Response<User.Get.Response<Schema.Types.ObjectId> | ErrorResponse>,
  ) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.json(user);
  },
);

/**
 * Update user by id
 * @route PUT /api/users/:id
 */
export const updateUser = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, User.Put.Payload>,
    res: Response<User.Put.Response<Schema.Types.ObjectId> | ErrorResponse>,
  ) => {
    try {
      const { id } = req.params;
      const { username, bio, _id, sex, image } = req.body;

      const newUser = await UserModel.findByIdAndUpdate({
        id: _id,
        username: username,
        bio: bio,
        sex: sex,
        image: image,
      });
      if (!newUser) {
        return res.status(404).send({ message: 'User not found' });
      }

      return res.status(200).json(newUser);
    } catch {
      /* TODO 4.4: Update User Information (6%) */
      /* Return 200 with updated user */
      /* Return 404 with "User not found" if update fails */
      throw new Error('`updateUser` Not Implemented');
    }
    /* End of TODO 5.4 */
  },
);

/**
 * Delete user by id
 * @route DELETE /api/users/:id
 */
export const deleteUser = asyncWrapper(
  async (
    req: Request<{ id: string }>,
    res: Response<User.Delete.Response | ErrorResponse>,
  ) => {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).send({ message: 'User not found' });
    res.status(204).send();
  },
);
