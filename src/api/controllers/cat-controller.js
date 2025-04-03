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
    // Проверка обязательных полей
    if (!req.body.cat_name || !req.body.owner) {
      return res.status(400).json({ error: "Не указано имя кота или владелец" });
    }

    const catData = {
      cat_name: req.body.cat_name,
      owner: req.body.owner,
      weight: req.body.weight || null, // если не указан - будет null
      birthdate: req.body.birthdate || null,
      filename: req.file?.filename // имя файла из multer
    };

    const result = await addCat(catData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Ошибка при добавлении кота:', error);
    res.status(500).json({ error: error.message });
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