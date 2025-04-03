let userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems[0].user_id + 1;
  const newUser = {
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  };
  userItems.unshift(newUser);
  return newUser;
};

const updateUser = (userId, newData) => {
  const index = userItems.findIndex(u => u.user_id == userId);
  if (index !== -1) {
    userItems[index] = { ...userItems[index], ...newData };
    return userItems[index];
  }
  return null;
};

const removeUser = (userId) => {
  const initialLength = userItems.length;
  userItems = userItems.filter(u => u.user_id != userId);
  return userItems.length !== initialLength;
};

export {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser
};