import { addCat, findCatById, listAllCats, updateCat, removeCat } from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201).json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  const catId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedCat = updateCat(catId, updatedData);
    if (updatedCat) {
      res.json({
        message: 'Cat updated successfully.',
        cat: updatedCat
      });
    } else {
      res.status(404).json({ error: 'Cat not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCat = (req, res) => {
  const catId = req.params.id;
  const isDeleted = removeCat(catId);

  if (isDeleted) {
    res.json({ message: 'Cat deleted successfully.' });
  } else {
    res.status(404).json({ error: 'Cat not found' });
  }
};

export { getCat, getCatById, postCat, putCat, deleteCat };