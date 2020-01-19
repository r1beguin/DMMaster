const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO:add position

const FightSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  active: {
    type: Boolean,
    required: true,
  },
  round: {
    type: Number,
    required: false,
    default: 0
  },
  turn: {
    type: Number,
    required: false,
    default: 0
  },
  involved: [{
    creature: { 
      type: Schema.Types.ObjectId,
      ref: 'Creature',
      required: true,
      },
    initiative: { 
      type: Number,
      required: true,
     },
    alive: { 
      type: Boolean,
      required: true,
      default: true,
     },
    HP_lost: { 
      type: Number,
      required: true,
      default: 0,
    },
    HP_gained:{ 
      type: Number,
      required: true,
      default: 0,
    },
  }]
}, 
{
  versionKey: false
});

// exports.participant = participant;
module.exports = Fight = mongoose.model('fight', FightSchema);
