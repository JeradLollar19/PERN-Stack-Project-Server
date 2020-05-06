require('dotenv').config();
const express = require('express');
const app = express();
const reviews = require('./Controllers/reviewController');
const user = require('./Controllers/userController');
const sequelize = require('./db');

sequelize.sync();

app.use(express.json());
app.use(require('./Middleware/headers'));


app.use('/reviews', reviews);
app.use('/user', user);









app.listen(process.env.PORT, () => console.log(`app is listening on port ${process.env.PORT}`));