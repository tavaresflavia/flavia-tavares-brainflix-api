const express = require('express');
const app = express();
const fs = require('fs');

require('dotenv').config()

const {PORT, BACKEND_URL } = process.env

app.listen(PORT, console.log(`listening port ${PORT}`))

