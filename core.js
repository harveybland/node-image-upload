const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const Schema = mongoose.Schema;
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

var mongoDB =
  'mongodb+srv://admin123:y2uKKR9jcYOEKq7C@localevents.dvobggb.mongodb.net/localEvents?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.app = app;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
