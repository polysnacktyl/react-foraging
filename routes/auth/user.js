const router = require("express").Router();
const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const Upload = require('../../models/uploads');
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
db = require('../../models');

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter a password of at least 6 characters.",
        });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({
          errorMessage: "Please enter the same password twice.",
        });

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { user: savedUser._id, },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send();
  }
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email })

    if (!existingUser)
      return res
        .status(401)
        .json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: "Wrong email or password." });

    const token = jwt.sign(
      { user: existingUser._id, },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, //https-only
        sameSite: "none",
      })
      //used to be .send(token)
      .json(existingUser)

  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send('err try again');
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json('successful signout')
});

router.post('/upload', async (req, res) => {
  
  try {
    const name = req.body.name;
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(
      fileStr,
      {
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        cloud_name: process.env.CLOUDINARY_NAME,
        image_metadata: true
      });

    let createdate = (uploadResponse.image_metadata.CreateDate.split(' '));
    let thumbnail = ('https://res.cloudinary.com/fung-id/image/upload/c_thumb,w_400/' + uploadResponse.public_id + '.jpg');
    let imageurl = ('https://res.cloudinary.com/fung-id/image/upload/' + uploadResponse.public_id + '.jpg')

    let lat = uploadResponse.image_metadata.GPSLatitude.split(/[^\d\w.]+/);
    let lat1 = parseFloat(lat[0]);
    let lat2 = parseFloat(lat[2] / 60);
    let lat3 = parseFloat(lat[3] / 3600);
    let lat4 = lat[4];
    let latitude = (lat1 + lat2 + lat3).toFixed(6) * 1
    if (lat4 === 'S') { latitude = latitude * -1 }

    let lon = uploadResponse.image_metadata.GPSLongitude.split(/[^\d\w.]+/);
    let lon1 = parseFloat(lon[0]);
    let lon2 = parseFloat(lon[2] / 60);
    let lon3 = parseFloat(lon[3] / 3600);
    let lon4 = lon[4];
    let longitude = (lon1 + lon2 + lon3).toFixed(6) * 1
    if (lon4 === 'W') { longitude = longitude * -1 }

    mongoose.connect(mongoDB);
    var new_upload = new Upload({
      user: req.body.user,
      commonNames: req.body.commonNames,
      name: name,
      identification: req.body.identification,
      notes: req.body.notes,
      created: createdate[0],
      latitude: latitude,
      longitude: longitude,
      thumbnail: thumbnail,
      imageurl: imageurl
    });
    new_upload.save(function (err) {
      if (err) console.log(err.message);
    });

    res.json();
  } catch (err) {
    console.error('error message', err);
    res
      .status(533)
      .json({ err: err.message });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    await db.Upload
      .findByIdAndDelete(req.query._id)
  } catch (err) { console.error(err.message); }
});

router.get('/mine', async (req, res) => {
  const user = req.query.user;
  try {
    db.Upload
      .find({ user: user })
      .then(images => res.json(images))

  } catch { (err) => res.status(400).json(err.message); }

});

router.get('/locate', async (req, res) => {
  const user = req.query.user;
  const name = req.query.name;
  const common = req.query.commonNames;
  if (req.query.name) {
    try {
      db.Upload
        .find({ $and: [{ user: user }, { name: name }] })
        .then(theseFungi => res.json(theseFungi))
    } catch { (err) => res.status(400).json(err.message); }
  } else {
    try {
      db.Upload
        .find({ $and: [{ user: user }, { commonNames: common }] })
        .then(theseFungi => res.json(theseFungi))
    } catch { (err) => res.status(400).json(err.message); }
  }
}
)

router.get('/detail', async (req, res) => {
  const ID = (req.query._id);
  try {
    db.Upload
      .find({ _id: ID })
      .then(images => res.json(images))
  } catch { (err) => res.status(400).json(err.message); }
});

router.put('/edit', async (req, res) => {
  const image = req.body._id;
  let commonNames;
  let identification;

  //when commonNames in req.body => split on comma before inclusion in params
  //since .split() on udnefined throws an error.
  if (req.body.commonNames != undefined) {
    commonNames = req.body.commonNames.split(',')
  };

  if (req.body.name != undefined) {
    identification = true
  };

  let params = {
    name: req.body.name,
    commonNames: commonNames,
    notes: req.body.notes,
    identification: identification
  };

  //remove undefined values from params, 
  //prevent existing document fields updating to null
  for (let prop in params) if (!params[prop]) delete params[prop];

  try {
    await db.Upload
      .findByIdAndUpdate(image, params, { new: true })
      .then(image => res.send(image))

  } catch { (err) => res.status(400).json(err); }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET);
    res
      .send(true)


  } catch (err) {

    res
      .json(false);
  }
});

module.exports = router;
