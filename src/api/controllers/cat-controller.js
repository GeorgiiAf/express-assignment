import { addCat, findCatById, listAllCats, updateCat, removeCat, findCatsByUser } from '../models/cat-model.js';



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

const postCat = async (req, res) => {
  try {
    if (!req.body.cat_name || !req.body.owner) {
      return res.status(400).json({ error: "Cat name or owner is not specified" });
    }

    const catData = {
      cat_name: req.body.cat_name,
      owner: req.body.owner,
      weight: req.body.weight || null,
      birthdate: req.body.birthdate || null,
      filename: req.file?.filename
    };

    const result = await addCat(catData);
    res.status(201).json(result);
  } catch (error) {
    console.error('error while added cat:', error);
    res.status(500).json({ error: error.message });
  }
};
const putCat = async (req, res) => {
  try {
    const success = await updateCat(
      req.params.id,
      req.body,
      req.user.user_id,
      req.user.role
    );

    success
      ? res.json({ message: 'Cat updated' })
      : res.status(403).json({ message: 'Update forbidden' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    const success = await removeCat(
      req.params.id,
      req.user.user_id,
      req.user.role
    );

    success
      ? res.json({ message: 'Cat deleted' })
      : res.status(403).json({ message: 'Deletion forbidden' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getCatsByUser = async (req, res) => {
  try {
    const cats = await findCatsByUser(req.params.id);
    if (cats.length === 0) {
      return res.status(404).json({ message: 'No cats found for this owner' });
    }
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { getCat, getCatById, postCat, putCat, deleteCat, getCatsByUser };