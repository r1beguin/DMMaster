const mongoose = require('mongoose');

const CreatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  hp: {
    type: String,
    required: true,
    default: "player"
  }
}, 
{
  versionKey: false
});

module.exports = Creature = mongoose.model('creature', CreatureSchema);
