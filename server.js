const { cloudinary } = require('./utils/cloudinary');
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var cors = require('cors');
const routes = require('./routes');

app.use(express.static('public'));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fungID',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
});
