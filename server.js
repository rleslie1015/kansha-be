const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const userRouter = require('./api/user/userRouter');
const recRouter = require('./api/recognition/recRouter');
const auth = require('./middleware/authMiddleWare')
const profileRouter = require('./api/profile/profileRouter')
const picRouter = require('./api/profile-pic/picRouter');
const liveFeedRouter = require('./api/livefeed/livefeedRouter')

server.use(express.json());
server.use(express.urlencoded({ extended: false}));
server.use(helmet());
server.use(cors());
server.use('/feed', auth.fixSSEToken);
server.use(auth.validateToken);
server.use('/users', userRouter);
server.use('/rec', recRouter);
server.use('/profile', profileRouter)
server.use('/profile-pic', picRouter);
server.use('/feed', liveFeedRouter);


server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is Running!' })
}) 

module.exports = server 