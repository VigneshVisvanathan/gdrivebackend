const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();


// The name of the bucket that you have created
const BUCKET_NAME = 'gdriveclone';
AWS.config.update({region: 'ap-south-1'});

const s3 = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET,
    region: 'ap-south-1'
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'opm.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

const getFiles=()=>{ 
    
const params = { 
    Bucket: BUCKET_NAME,
    Delimiter: '',
    Prefix: '' 
  }


s3.listObjects(params, function (err, data) {
    if(err)throw err;
    console.log(data);
  });
}


module.exports = { uploadFile,getFiles };