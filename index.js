const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const videosRouter = require('./routes/videos')


require('dotenv').config()

const {PORT, BACKEND_URL } = process.env

app.use(cors({
    origin: BACKEND_URL
}));

app.use(express.json());

app.use(express.static('./public'))

app.use('/videos', videosRouter);


app.listen(PORT, console.log(`listening port ${PORT}`));
