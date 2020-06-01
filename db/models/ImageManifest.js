const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageManifestSchema = new Schema(
    {
        active: {
            type: Schema.Types.ObjectId,
            required : true
        },
        fog: {
            type: Object,
            required: false
        }
    },
    {
      versionKey: false
    }
);
module.exports = ImageManifest = mongoose.model('ImageManifest', ImageManifestSchema, 'images');