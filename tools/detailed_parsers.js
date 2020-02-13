module.exports = {

  // from the exrtracted stat string, return the value and modifier of a stat
  // ex "21 (+5)" => { value: 21, mod: 5 }
  parseStats: stat_string => {
    str_split = stat_string.split("(");
    value = parseInt(str_split[0]);
    mod = parseInt(str_split[1].replace(")", "").replace("−", "-"));
    return {
      value,
      mod
    };
  },

  // from the extracted hp sting, return the hp value and roll parameters
  // ex "135 (18d10 + 36)" => {value: 135, roll: { number: 18, dice: 10, mod: 36 }}
  parseHP: hp_string => {
    // cutting the string at the '(', ')', '+', and '−' /!\ different from '-'
    str_split = hp_string.split(/[()d\+−]+/);

    value = parseInt(str_split[0]);
    number = parseInt(str_split[1]);
    dice = parseInt(str_split[2]);
    mod = 0;

    // check if modifier and of what sign. 4 because last value is ''
    if (str_split.length > 4) {
      mod = parseInt(str_split[3]);
      if (hp_string.includes("−")) mod = -mod;
    }

    hp = {
      value,
      roll: {
        number,
        dice,
        mod
      }
    };
    return hp;
  },

  // from the extracted challenge sting, return the cr value and xp
  // ex "10 (5,900 XP)" => { value: 10, xp: 5900 }
  parseChallenge: challenge_string => {
    str_split = challenge_string.split(/[()XP]+/);

    value = str_split[0];
    xp = str_split[1];

    // deal with '/' for cr is less than 1
    if (value.includes("/")) {
      value = 1.0 / parseFloat(value.split("/")[1]);
    } else {
      value = parseInt(value);
    }

    // deal with ',' for xp more than 1,000
    if (xp.includes(",")) {
      xp_split = xp.split(",");
      xp = 1000 * parseInt(xp_split[0]) + parseInt(xp_split[1]);
    } else {
      xp = parseInt(xp);
    }

    challenge = {
      value,
      xp
    };
    return challenge;
  },

  // from the extracted saving sting, return the dict of savings
  // ex "Con +6, Int +8, Wis +6" => { CON: 6, INT: 8, WIS: 6 }
  parseSaving: saving_str => {
    str_split = saving_str.split(/[,]+/);

    saving = {};
    for (stat of str_split) {
      stat_split = stat.split("+");
      saving[stat_split[0].toUpperCase().trim()] = parseInt(stat_split[1]);
    }

    return saving;
  },

  // from the extracted skill sting, return the dict of skills
  // ex "History +12, Perception +10" => { history: 12, perception: 10 }
  parseSkills: skill_str => {
    str_split = skill_str.split(/[,()]+/);
    //TODO: finish this and check for special cases: ()
    skills = {};
    for (skill of str_split) {
      skill_split = skill.split("+");
      skills[stat_split[0].toLowerCase()] = parseInt(stat_split[1]);
    }

    return skills;
  },
}