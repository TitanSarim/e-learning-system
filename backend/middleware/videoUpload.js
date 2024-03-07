const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');

const s3Config = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SCRET_KEY,
    Bucket: process.env.AWS_S3_BUCKET_NAME
});

const avatarS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, "elearningplatform/courses/videos/" + file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname))
    }
});



exports.imageUpload = multer({
    storage: avatarS3Config,
})