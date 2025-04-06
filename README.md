# WSK Express API Assignment

This project is a RESTful API built with Node.js and Express.js. It provides functionality for managing users and cats, including user authentication, file uploads, and database operations.


- **User Management**: 
  - Register new users.
  - Login and authentication using JWT.
  - Update user details and roles (admin functionality).
  - Delete users.

- **Cat Management**:
  - Add, update, and delete cat records.
  - Upload cat images and generate thumbnails using `sharp`.
  - Retrieve all cats or filter by owner.

- **Authentication**:
  - Secure routes with JWT-based authentication.
  - Middleware for token validation.

- **File Uploads**:
  - Upload images for cats using `multer`.
  - Generate thumbnails for uploaded images.

- **Database Integration**:
  - MySQL database for storing user and cat data.
  - SQL queries for CRUD operations.

