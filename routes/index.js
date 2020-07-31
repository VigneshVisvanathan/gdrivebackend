var express = require('express');
var router = express.Router();
var {uploadFile,getFiles} = require('../library/upload');
const { openDelimiter } = require('ejs');

 
/* GET home page. */
router.get('/', function(req, res, next) {
  //getFiles();
  // uploadFile()
  res.render('index', { title: 'Express' });
});

module.exports = router;
