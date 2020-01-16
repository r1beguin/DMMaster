const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    default: "player"
  },
  creature: { 
    type: Schema.Types.ObjectId,
    ref: 'Creature'
   },
}, 
{
  versionKey: false
});

module.exports = User = mongoose.model('user', UserSchema);
