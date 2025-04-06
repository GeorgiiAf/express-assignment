import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser
} from '../models/user-model.js';


import bcrypt from 'bcrypt';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await addUser(req.body);
    if (result.user_id) {
      res.status(201).json(result);
    } else {
      const error = new Error('Failed to create user');
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedUser = await updateUser(userId, updatedData);
    if (updatedUser) {
      res.json({
        message: 'User updated successfully.',
        user: updatedUser,
      });
    } else {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const isDeleted = removeUser(userId);

  if (isDeleted) {
    res.json({ message: 'User deleted successfully.' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export { getUser, getUserById, postUser, putUser, deleteUser };