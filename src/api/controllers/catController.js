import cats from '../models/catModel.js';

export const getAllCats = (req, res) => {
    res.json(cats);
};

export const getCatById = (req, res) => {
    const cat = cats.find(c => c.cat_id == req.params.id);
    res.json(cat || { error: 'Cat not found' });
};

export const addCat = (req, res) => {
    const newCat = req.body;
    cats.push(newCat);
    res.status(201).json(newCat);
};

export const updateCat = (req, res) => {
    res.json({ message: 'Cat item updated.' });
};

export const deleteCat = (req, res) => {
    res.json({ message: 'Cat item deleted.' });
};