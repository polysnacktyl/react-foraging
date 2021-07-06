const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    imageurl: { type: String, required: false },
    latitude: {type: String, required: false }, 
    longitude: {type: String, required: false }, 
    created: {type: String, required: false },
    
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
