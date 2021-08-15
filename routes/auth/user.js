const router = require("express").Router();
const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const Upload = require('../../models/uploads');
const mongoose = require('mongoose');
const { find } = require("../../models/user");
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
    console.error(err);
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
    const tags = req.body.tags.split(',');
    console.log('split', tags);
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(
      fileStr,
      {
        upload_preset: cloudinary.upload_preset,
        image_metadata: true
      });

    let createdate = (uploadResponse.image_metadata.CreateDate.split(' '));
    let thumbnail = ('http://res.cloudinary.com/fung-id/image/upload/c_thumb,w_400/' + uploadResponse.public_id + '.jpg');
    let imageurl = ('http://res.cloudinary.com/fung-id/image/upload/' + uploadResponse.public_id + '.jpg')

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

    mongoose.connect('mongodb://localhost/fungID');
    var new_upload = new Upload({
      user: req.body.user,
      tags: tags,
      created: createdate[0],
      latitude: latitude,
      longitude: longitude,
      thumbnail: thumbnail,
      imageurl: imageurl
    });
    new_upload.save(function (err) {
      if (err) console.log(err);
    });

    res.json();
  } catch (err) {
    console.error(err.message);
    res
      .status(503)
      .json({ err: err.message });
  }
});

router.delete('/delete', async (req, res) => {
  (console.log(req.query._id));
  try {
    await db.Upload
      .findByIdAndDelete(req.query._id)
  } catch (err) { console.error(err); }
});

router.get('/mine', async (req, res) => {
  const user = req.query.user;
  try {
    db.Upload
      .find({ user: user })
      .then(images => res.json(images))

  } catch { (err) => res.status(400).json(err.message); }

});

router.get('/detail', async (req, res) => {
  const ID = (req.query._id);
  try {
    db.Upload
      .find({ _id: ID })
      .then(images => res.json(images))
  } catch { (err) => res.status(400).json(err.message); }
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
