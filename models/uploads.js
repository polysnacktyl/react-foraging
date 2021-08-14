const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    user:
    {
        type: String,
        required: true,
        trim: true
    },
    imageurl:
    {
        type: String,
        required: false
    },
    thumbnail:
    {
        type: String,
        required: false
    },
    latitude:
    {
        type: String,
        required: false
    },
    longitude:
    {
        type: String,
        required: false
    },
    created:
    {
        type: String,
        required: false
    },
    tags:
        [{
            type: String,
            trim: true, 
            required: false
        }]

});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
