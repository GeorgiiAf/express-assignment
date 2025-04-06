import sharp from 'sharp';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { validationResult } from 'express-validator';


const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // max 10 MB
    },
    fileFilter: (req, file, cb) => {
        // only allow images and videos
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            const error = new Error('Only images and videos are allowed!');
            error.status = 400;
            cb(error, false);
        }
    },
});



const createThumbnail = async (req, res, next) => {
    console.log('todo: tee kuvakäsittely', req.file);
    if (!req.file) {
        next();
        // next('Oh no, kuvaa ei löydy 🧐');
        return;
    }

    let extension = 'jpg';
    if (req.file.mimetype === 'image/png') {
        // if (req.file.mimetype.includes('/png')) {
        extension = 'png';
    }

    await sharp(req.file.path)
        .resize(100, 100)
        .toFile(`${req.file.path}_thumb.${extension}`);

    next();
};

const authenticateToken = (req, res, next) => {
    console.log('authenticateToken', req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);
    if (token == null) {
        return res.sendStatus(401);
    }
    try {
        res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).send({ message: 'invalid token' });
    }
};

const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500); // default is 500 if err.status is not defined
    res.json({
        error: {
            message: err.message,
            status: err.status || 500,
        },
    });
};

const validationErrors = async (req, res, next) => {
    // validation errors can be retrieved from the request object (added by express-validator middleware)
    const errors = validationResult(req);
    // check if any validation errors
    if (!errors.isEmpty()) {
        const messages = errors
            .array()
            .map((error) => `${error.path}: ${error.msg}`)
            .join(", ");
        const error = new Error(messages);
        error.status = 400;
        next(error);
        return;
    }
    next();
};

export {
    createThumbnail,
    authenticateToken,
    validationErrors,
    notFoundHandler,
    errorHandler,
    upload
};
