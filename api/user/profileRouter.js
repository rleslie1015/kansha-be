const router = require('express').Router()
const auth = require('../../middleware/authMiddleWare')

router
    .get('/', auth, (req, res) => {
    res.status(200).json({user: req.profile})
})

module.exports = router