const core = require('../core');
const schemas = require('../schemas/imageSchema');

const multer = require('multer');
const ObjectId = require('mongodb').ObjectId;
const fs = require('file-system');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

core.app.post(
  '/api/uploadphoto',
  upload.single('myImage'),
  async (req, res) => {
    try {
      var img = fs.readFileSync(req.file.path);
      var encode_image = img.toString('base64');

      schemas.imagesModel.create({
        contentType: req.file.mimetype,
        image: Buffer.from(encode_image, 'base64'),
      });
      const images = await schemas.imagesModel.find();
      const imgArray = images.map((element) => element._id);
      res.status(200).json(imgArray);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

core.app.get('/api/photos', async (req, res) => {
  const images = await schemas.imagesModel.find();
  const imgArray = images.map((element) => element._id);
  res.status(200).json(imgArray);
});

core.app.get('/api/photo/:id', (req, res) => {
  var filename = req.params.id;
  const image = schemas.imagesModel.findOne(
    { _id: ObjectId(filename) },
    (err, result) => {
      if (err) {
        return console.log(err);
      }

      var buffer = Buffer.from(new Uint8Array(result.image.buffer));
      res.contentType('image/jpeg');
      // res.send(buffer);
      res.status(200).send(buffer);
    }
  );
});
