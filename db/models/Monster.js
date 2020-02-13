const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonsterSchema = new mongoose.Schema(
  {
    // may contain category
    name: { type: String, required: true, unique: true },
    // To split in size, type, allignment
    meta: { type: String, required: true },
    ac: { type: String, required: true },
    hp: {
      value: { type: Number, required: true },
      roll: {
        number: { type: Number, required: true },
        dice: { type: Number, required: true },
        mod: { type: Number, required: true }
      }
    },
    speed: { type: String, required: true },
    stats: {
      STR: {
        value: { type: Number, required: true },
        mod: { type: Number, required: true }
      },
      DEX: {
        value: { type: Number, required: true },
        mod: { type: Number, required: true }
      },
      CON: {
        value: { type: Number, required: true },
        mod: { type: Number, required: true }
      },
      INT: {
        value: { type: Number, required: true },
        mod: { type: Number, required: true }
      },
      WIS: {
        value: { type: Number, required: true },
        mod: { type: Number, required: true }
      },
      CHA: {
        value: { type: Number, required: true },
        mod: { type: Number, required: true }
      }
    },
    attributes: {
      senses: { type: String, required: true },
      languages: { type: String, required: true },
      challenge: {
        value: { type: Number, required: true },
        xp: { type: Number, required: true }
      },
      saving: {
        STR: { type: Number, required: false },
        DEX: { type: Number, required: false },
        CON: { type: Number, required: false },
        INT: { type: Number, required: false },
        WIS: { type: Number, required: false },
        CHA: { type: Number, required: false }
      },
      skills: { type: String, required: false },
      resistances: { type: String, required: false },
      immunities: { type: String, required: false }
    },
    description: {
      traits: [{ type: String, required: true }],
      actions: [{ type: String, required: true }],
      reactions: [{ type: String, required: true }],
      legendaryAction: [{ type: String, required: true }]
    },
    image: {
      miniature: { type: String, required: true },
      full: { type: String, required: true }
    }
  },
  {
    versionKey: false
  }
);

module.exports = Monster = mongoose.model("Monster", MonsterSchema);
