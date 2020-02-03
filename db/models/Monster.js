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
    saving: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    resistances: {
      type: String,
      required: false,
    },
    immunities: {
      type: String,
      required: false,
    },
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
  },
  description: {
    traits: [{
      type: String,
      required: true,
    }],
    actions: [{
      _id: false,
      header: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    }],
    reactions: [{
      _id: false,
      header: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    }],
    legendaryAction: [{
      _id: false,
      header: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
    }],
  }
}, 
{
  versionKey: false
});

module.exports = Monster = mongoose.model('Monster', MonsterSchema);
