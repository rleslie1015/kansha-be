const router = require('express').Router();
const upload = require('./profilePicUpload');

const singleUpload = upload.single('image');

router
    .post('/', function(req, res) {
        singleUpload(req, res, function(err) {
            console.log(req.file.location)
            return res.json({'url': req.file.location});
        }
        )
    });

module.exports = router