import users from '../models/userModel.js';

export const getAllUsers = (req, res) => {
    res.json(users);
};

export const getUserById = (req, res) => {
    const user = users.find(u => u.user_id == req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
};

export const addUser = (req, res) => {
    const newUser = {
        ...req.body,
        user_id: users.length > 0 ? Math.max(...users.map(u => u.user_id)) + 1 : 1
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
    res.json({ message: 'User item updated.' });
};

export const deleteUser = (req, res) => {
    res.json({ message: 'User item deleted.' });
};