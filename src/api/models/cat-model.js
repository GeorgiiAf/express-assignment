// mock data
let catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((item) => item.cat_id == id);
};

const addCat = (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const newId = catItems[0].cat_id + 1;
  const newCat = {
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  };
  catItems.unshift(newCat);
  return newCat;
};

const updateCat = (catId, newData) => {
  const index = catItems.findIndex(c => c.cat_id == catId);
  if (index !== -1) {
    catItems[index] = { ...catItems[index], ...newData };
    return catItems[index];
  }
  return null;
};

const removeCat = (catId) => {
  const initialLength = catItems.length;
  catItems = catItems.filter(c => c.cat_id != catId);
  return catItems.length !== initialLength;
};

export {
  listAllCats,
  findCatById,
  addCat,
  updateCat,
  removeCat
};