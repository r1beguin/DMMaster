const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  role: {
    type: String,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
    default: 0
  },
  alive: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  monster: { 
    type: Schema.Types.ObjectId,
    ref: 'Monster'
  },
}, 
{
  versionKey: false
});

module.exports = Creature = mongoose.model('Creature', CreatureSchema);
