const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');


aws.config.update({
    secretAccessKey: process.env.S3_KEY,
    accessKeyId: process.env.S3_ID,
    region: 'us-east-2'
});


const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'kansha-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname))
    },
    
    
    
  })
})
 
module.exports = upload;