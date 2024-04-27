import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Require environmental variables
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3(region, accessKeyId, secretAccessKey);

// Upload file to AWS S3
export const upload = file => {
    const fileStream = fs.createReadStream(file.path);
    console.log(bucketName);
    return s3
        .upload({
            Bucket: bucketName,
            Body: fileStream,
            Key: path.basename(file.filename),
        })
        .promise();
};
