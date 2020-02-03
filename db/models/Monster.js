const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonsterSchema = new mongoose.Schema({
  name: { // may contain category
    type: String,
    required: true,
    unique: true,
  },
  meta: { // To split in size, type, allignment
    type: String,
    required: true,
  },
  ac: {
    type: String,
    required: true,
  },
  hp: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  stats: {
    STR:{
      type: String,
      required: true,
    },
    DEX:{
      type: String,
      required: true,
    },
    CON:{
      type: String,
      required: true,
    },
    INT:{
      type: String,
      required: true,
    },
    WIS:{
      type: String,
      required: true,
    },
    CHA:{
      type: String,
      required: true,
    },
  },
  attributes: {
    senses: {
      type: String,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
    challenge: {
      type: String,
      required: true,
    },
    saving: {
      type: String,
      required: false,
    },
    skills: {
      type: String,
      required: false,
    },
    resistances: {
      type: String,
      required: false,
    },
    immunities: {
      type: String,
      required: false,
    },
    
  },
  description: {
    traits: [{
      type: String,
      required: true,
    }],
    actions: [{
      type: String,
      required: true,
    }],
    reactions: [{
        type: String,
        required: true,
    }],
    legendaryAction: [{
        type: String,
        required: true,
    }],
  }
}, 
{
  versionKey: false
});

module.exports = Monster = mongoose.model('Monster', MonsterSchema);
