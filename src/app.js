const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

// console.log(dotenv.config());
const { parsed } = dotenv.config();
if (!parsed.S3_BUCKET_ENDPOINT || !parsed.S3_BUCKET_KEY || !parsed.S3_BUCKET_SECRET || !parsed.S3_BUCKET_NAME) {
    console.log("Error parsing the env variables! Make sure you provided the correct .env file!");
    process.exit(0);
}

const s3BucketEndpoint = new AWS.Endpoint(process.env.S3_BUCKET_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: s3BucketEndpoint,
    accessKeyId: process.env.S3_BUCKET_KEY,
    secretAccessKey: process.env.S3_BUCKET_SECRET
});

const uploadFileToS3 = ({ filePath, ACL = "public-read" }) => {
    const contentType = mime.contentType(filePath);
    const ext = mime.extensions[contentType][0];
    const fileName = uuid() + "_" + Date.now() + "." + ext;
    return new Promise((resolve, reject) => {
        const buffer = fs.readFileSync(filePath);
        s3.putObject({ Bucket: process.env.S3_BUCKET_NAME, Key: fileName, ACL: ACL, Body: buffer, ContentType: contentType }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                data.Url = `https://${process.env.S3_BUCKET_NAME}.${process.env.S3_BUCKET_ENDPOINT}/${fileName}`;
                resolve(data);

                // Uncommend this incase you want to get files with ACL = private
                // s3.getSignedUrl("getObject", { Bucket: process.env.S3_BUCKET_NAME, Key: fileName }, (err, url) => {
                //     if (err) {
                //         reject(err);
                //     } else {
                //         resolve({ Url: url, Etag: data.ETag });
                //     }
                // })
            }
        })
    })
}

const fileName = "sample.png";
const filePath = path.resolve(__dirname, "..", "files", fileName);

uploadFileToS3({ filePath: filePath })
    .then(data => {
        console.log(data);
        // do whatever you want with it (save in database etc.)
    })
    .catch(err => {
        console.log(err);
    })