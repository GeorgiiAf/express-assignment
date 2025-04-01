import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/v1/cat', (req, res) => {
    const cat = {
        cat_id: 1,
        name: 'Whiskers',
        birthdate: '2020-05-15',
        weight: 4.5,
        owner: 'John Doe',
        image: 'https://loremflickr.com/320/240/cat'
    };
    res.json(cat);
});

app.use('/public', express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});