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

// const uploadFile = (fileName) => {
//     // Read content from the file
//     const fileContent = fs.readFileSync(fileName);

//     // Setting up S3 upload parameters
//     const params = {
//         Bucket: BUCKET_NAME,
//         Key: 'opm.jpg', // File name you want to save as in S3
//         Body: fileContent
//     };

//     // Uploading files to the bucket
//     s3.upload(params, function(err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(`File uploaded successfully. ${data.Location}`);
//     });
// };

// const getFiles=()=>{ 
    
// const params = { 
//     Bucket: BUCKET_NAME,
//     Delimiter: '',
//     Prefix: '' 
//   }


// s3.listObjects(params, function (err, data) {
//     if(err)throw err;
//     console.log(data);
//   });
// }
exports.doUpload = (req, res) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer
    }
s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).send("Error -> " + err);
    }
    res.send("File uploaded successfully! -> keyname = " + req.file.originalname);
  });
}
 
exports.listKeyNames = (req, res) => {
  const params = {
    Bucket: BUCKET_NAME
  }
 
  var keys = [];
  s3.listObjectsV2(params, (err, data) => {
        if (err) {
      console.log(err, err.stack); // an error occurred
      res.send("error -> "+ err);
        } else {
            var contents = data.Contents;
            contents.forEach(function (content) {
                keys.push(content.Key);
      });
      res.send(keys);
    }
  });
}
 
exports.doDownload = (req, res) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: req.params.filename
  }
 
  res.setHeader('Content-Disposition', 'attachment');
 
  s3.getObject(params)
    .createReadStream()
      .on('error', function(err){
        res.status(500).json({error:"Error -> " + err});
    }).pipe(res);
}




// module.exports = { uploadFile,getFiles };