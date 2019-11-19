const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const userRouter = require('./api/user/userRouter');
const recRouter = require('./api/recognition/recRouter');
const auth = require('./middleware/authMiddleWare')
const profileRouter = require('./api/user/profileRouter')

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(auth.validateToken)
server.use('/users', userRouter);
server.use('/rec', recRouter);
server.use('/profile', profileRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is Running!' })
}) 

module.exports = server