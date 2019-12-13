const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const userRouter = require('./api/user/userRouter');
const recRouter = require('./api/recognition/recRouter');
const auth = require('./middleware/authMiddleWare')
const profileRouter = require('./api/profile/profileRouter')
const picRouter = require('./api/profile-pic/picRouter');
const liveFeedRouter = require('./api/livefeed/liveFeedRouter')
const reactionRouter = require('./api/reactions/reactionRouter')

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(helmet());
server.use(cors());
server.use('/feed/live', auth.fixSSEToken);
server.use(auth.validateToken);
server.use('/users', userRouter);
server.use('/rec', recRouter);
server.use('/profile', profileRouter)
server.use('/profile-pic', picRouter);
server.use('/feed', liveFeedRouter);
<<<<<<< HEAD
server.use('/comments', auth.validateId, reactionRouter('Comments'))
server.use('/reactions', auth.validateId, reactionRouter('Reactions'))
=======
server.use('/comments', reactionRouter('Comments'))
server.use('/reactions', reactionRouter('Reactions'))
>>>>>>> 284fc2f707c20619930b667b717b91d30541af93


server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is Running!' })
}) 

module.exports = server 