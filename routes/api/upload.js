const router = require('express').Router()
const mongoose = require('mongoose');
const Upload = require('../../models/uploads');
const { cloudinary } = require('../../utils/cloudinary');

router.route('/')
    .post(async (req, res) => {
        try {
            const fileStr = req.body.data;
            const uploadResponse = await cloudinary.uploader.upload(
                fileStr,
                {
                    upload_preset: cloudinary.upload_preset,
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

            mongoose.connect('mongodb://localhost/fungID');
            var new_upload = new Upload({
                user: req.body.user,
                created: createdate[0],
                latitude: latitude,
                longitude: longitude,
                thumbnail: thumbnail,
                imageurl: imageurl
            });
            new_upload.save(function (err) {
                if (err) console.log(err);
            });

            res.json({ msg: 'yaya' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    });

module.exports = router;

