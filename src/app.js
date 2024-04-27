const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('express-favicon');
const logger = require('morgan');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const methodOverride = require('method-override');
const crypto = require('crypto');
const path = require('path');

const mainRouter = require('./routes/mainRouter.js');


// middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


//create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

// routes
app.use('/api/v1', mainRouter);

//user routes
app.use('/api/v1/users', require('./routes/userRoutes.js'));

// pet routes
const uploads = multer({ storage });

app.use('/api/v1/pets/medical', uploads.single('fileMedical'), require('./routes/petRouter'));
app.use('/api/v1/pets', uploads.single('fileImages'), require('./routes/petRouter'));


module.exports = app;
