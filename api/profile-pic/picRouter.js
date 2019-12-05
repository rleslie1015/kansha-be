const router = require('express').Router();
//const upload = require('./profilePicUpload');

//const singleUpload = upload.single('image');

router
    .post('/', function(req, res) {
        //singleUpload(req, res, function(err) {
            return res.json({'profile pic url': req.file.location});
        }
        )
    ;

module.exports = router