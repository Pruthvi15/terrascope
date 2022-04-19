const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { v4 } = require('uuid');
const { getImage } = require('./service/image');

if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/data`);
  },
  filename: function (req, file, cb) {
    cb(null, v4() + '.' + file.originalname.split('.').pop());
  },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|png|jpg|gif/i;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid File format.'));
  }
});

const upload = multer({ storage });

app.post('/image', upload.single('uploaded_file'), (req, res) => {
  res.send({ id: req.file.filename });
});

app.get('/image/:id', getImage);

module.exports = app;
