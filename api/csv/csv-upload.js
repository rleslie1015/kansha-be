// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const path = require('path');

// aws.config.update({
// 	secretAccessKey: process.env.S3_KEY,
// 	accessKeyId: process.env.S3_ID,
// 	region: 'us-east-2',
// });

// const s3 = new aws.S3();

// const upload = multer({
// 	storage: multerS3({
// 		s3: s3,
// 		bucket: 'kansha-bucket',
// 		acl: 'public-read',
// 		metadata: function(req, file, cb) {
// 			cb(null, { fieldName: file.fieldname });
// 		},
// 		key: function(req, file, cb) {
// 			cb(null, Date.now().toString() + path.extname(file.originalname));
// 		},
// 	}),
// });

// module.exports = upload;

// const s3 = new AWS.S3();
// const params = {
//     Bucket: 'kansha-bucket',
//     Key: filePath,
//     Body: csvFileContent,
//     ContentType: 'application/octet-stream',
//     ContentDisposition: contentDisposition(filePath, {
//         type: 'inline'
//     }),
//     CacheControl: 'public, max-age=86400'
// }
// s3.putObject(params, function(err, data) {
//     if (err) {
//         console.log("Error at uploadCSVFileOnS3Bucket function", err);
//         next(err);
//     } else {
//         console.log("File uploaded Successfully");
//         next(null, filePath);
//     }
// });

// Each header field specification:

// 1.Bucket : My Bucket name on S3 server.

// 2.Key : My file path in which my CSV file will be save.

// 3.Body : Content of my CSV file.

// 4.ContentType : We will be using 'application/octet-stream'.

// 5.ContentDisposition : We need to add "ContentDisposition" as a header field in my params object to successfully upload my CSV file on S3 bucket.

// 6.CacheControl: This is optional, when CDN request content from S3 bucket then this value is provided by S3 to CDN upto that time time CDN cache will not expire and CSN will then request to S3 after that time elapsed.
