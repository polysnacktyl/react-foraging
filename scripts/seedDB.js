const mongoose = require('mongoose');
const db = require('../models/index');

mongoose.connect('mongodb://localhost/fungID', {
    useNewUrlParser: true,
    useFindAndModify: false
});

const uploadSeed = [
    {
        imageurl: "imageurl1",
        latitude: "lat1",
        longitude: "long1",
        created: "create1"
    },
    {
        imageurl: "imageurl2",
        latitude: "lat2",
        longitude: "long2",
        created: "create2"
    },
    {
        imageurl: "imageurl3",
        latitude: "lat3",
        longitude: "long3",
        created: "create3"
    },
];

db.Upload
    .remove({})
    .then(() => db.Upload.collection.insertMany(uploadSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })