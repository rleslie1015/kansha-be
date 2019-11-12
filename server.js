const express = require('express');
const helmet = require('helmet');
// const cors = require('cors');
const server = express();
const userRouter = require('./api/user/userRouter');

server.use(express.json());
server.use(helmet());
// server.use(cors());
server.use('/users', userRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is Running!' })
}) 

module.exports = server