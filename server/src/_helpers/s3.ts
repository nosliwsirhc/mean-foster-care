import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';

const bucketName = process.env.AWS_BUCKET_NAME || '';
const region = process.env.AWS_BUCKET_REGION || '';
const accessKeyId = process.env.AWS_ACCESS_ID || '';
const secretAccessKey = process.env.AWS_SECRET_KEY || '';

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
export function uploadFile(file: File) {
  const fileStream = fs.createReadStream((file as any).path);

  const uploadParams: S3.PutObjectRequest = {
    Bucket: bucketName,
    Body: fileStream,
    Key: (file as any).filename,
  };

  return s3.upload(uploadParams).promise();
}

// downloads a file from s3
export function downloadFile(fileKey: string) {
  const downloadParams: S3.GetObjectRequest = {
    Bucket: bucketName,
    Key: fileKey,
  };
  return s3.getObject(downloadParams).createReadStream();
}

// deletes a file from s3
export function deleteFile(fileKey: string) {
  if (!fileKey) return;
  const deleteParams: S3.DeleteObjectRequest = {
    Bucket: bucketName,
    Key: fileKey,
  };
  return s3.deleteObject(deleteParams).promise();
}
