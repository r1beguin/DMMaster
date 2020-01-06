const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    default: "player"
  }
}, 
{
  versionKey: false
});

module.exports = User = mongoose.model('user', UserSchema);
