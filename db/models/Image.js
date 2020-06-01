const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema(
    {
        name: {
            type:String,
            default : "none",
            required : true
        },
        data: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required:true
        },
        height: {
            type: Number,
            required:true
        },
        scale: {
            x: {
                type: Number,
                required:true,
                default: 1.0
            },
            y: {
                type: Number,
                required:true,
                default: 1.0
            }
        },
        offset: {
            x: {
                type: Number,
                required:true,
                default: 0
            },
            y: {
                type: Number,
                required:true,
                default: 0
            }
        },
    },
    {
      versionKey: false
    }
);

module.exports = Image = mongoose.model('Image', ImageSchema);
