const router = require('express').Router();
const recModel = require('../recognition/recModel');
const auth = require('../../middleware/authMiddleWare');

router.get('/', auth.validateId, (req, res) => {
    console.log(req.profile.id)
    recModel.getUserInteractions(req.profile.id).then(rec => {
        req.profile.rec = rec
        res.status(200).json({ user: req.profile });
    })
    
});

module.exports = router;
