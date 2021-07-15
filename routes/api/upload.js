const router = require('express').Router()
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

            let createdate = (uploadResponse.image_metadata.DateCreated.split(/:/));
            let created = (createdate[1] + '/' + createdate[2] + '/' + createdate[0]);
            let thumbnail = ('http://res.cloudinary.com/fung-id/image/upload/c_thumb,w_400/' + uploadResponse.public_id + '.jpg');
            let imageurl = (uploadResponse.url);

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

            console.log(created);
            console.log(latitude);
            console.log(longitude);
            console.log(thumbnail);
            console.log(imageurl);
            
            res.json({ msg: 'yaya' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    });

module.exports = router;

