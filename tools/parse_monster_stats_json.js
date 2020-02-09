const fs = require("fs");
const Creature = require("../db/models/Monster");
const connectDB = require("../db/db");
const { parseStats, parseHP, parseChallenge, parseSaving } = require("./detailed_parsers")


getAttribute = (content_array, header) => {
  for (attribute of content_array) {
    if (typeof attribute === "string" && attribute.includes(header)) {
      return attribute.split(header).join("");
    }
  }
  return null;
};


fillContent = (monster_name, monster_content) => {
  // console.log(monster_name);

  // stats extraction
  var stats = {};
  for (let [key, value] of Object.entries(monster_content[4].table)) {
    stats[key] = parseStats(value[0]);
  }

  // attribures extraction
  const attribute_infos = {
    senses:       { header: "**Senses** ",                required: true,   parser: null },
    languages:    { header: "**Languages** ",             required: true,   parser: null },
    challenge:    { header: "**Challenge** ",             required: true,   parser: parseChallenge },
    skills:       { header: "**Skills** ",                required: false,  parser: null },
    saving:       { header: "**Saving Throws** ",         required: false,  parser: parseSaving },
    resistances:  { header: "**Damage Resistances** ",    required: false,  parser: null },
    immunities:   { header: "**Condition Immunities** ",  required: false,  parser: null }
  };
  var attributes = {};
  for ([key, { header, required, parser }] of Object.entries(attribute_infos)) {
    body = getAttribute(monster_content, header);
    if (body !== null) {
      attributes[key] = body
      if (parser) {
        attributes[key] = parser(attributes[key]);
      }
    } else if (required) {
      error("missing argument")
    }
  }

  // traits extraction
  // find first line after "Challenge"
  var index = 5;
  while (!monster_content[index++].includes("**Challenge**")) {}
  traits = [];
  // get all the lines before Actions
  while (
    index < monster_content.length &&
    !monster_content[index].includes("**Actions**")
  ) {
    traits.push(monster_content[index]);
    index++;
  }

  // actions extraction
  var index = 5;
  while (
    index < monster_content.length &&
    !monster_content[index++].includes("**Actions**")
  ) {}
  actions = [];
  // get all the lines before Actions
  while (index < monster_content.length) {
    line = monster_content[index];
    // break when entering another category
    if (line.slice(0, 2) === "**" && line.slice(0, 3) !== "***") break;
    actions.push(line);
    index++;
  }

  // reactions extraction
  var index = 5;
  while (
    index < monster_content.length &&
    !monster_content[index++].includes("**Reactions**")
  ) {}
  reactions = [];
  // get all the lines before Actions
  while (index < monster_content.length) {
    line = monster_content[index];
    // break when entering another category
    if (line.slice(0, 2) === "**" && line.slice(0, 3) !== "***") break;
    reactions.push(line);
    index++;
  }

  // reactions extraction
  var index = 5;
  while (
    index < monster_content.length &&
    !monster_content[index++].includes("**Legendary Actions**")
  ) {}
  legendaryAction = [];
  // get all the lines before Actions
  while (index < monster_content.length) {
    line = monster_content[index];
    // break when entering another category
    if (line.slice(0, 2) === "**" && line.slice(0, 3) !== "***") break;
    legendaryAction.push(line);
    index++;
  }

  // todo: nodes last index
  monster = new Monster({
    name: monster_name,
    meta: monster_content[0].split("*").join(""), // removes '*' around
    ac: getAttribute(monster_content, "**Armor Class** "),
    hp: parseHP(getAttribute(monster_content, "**Hit Points** ")),
    speed: getAttribute(monster_content, "**Speed** "),
    stats,
    attributes,
    description: {
      traits,
      actions,
      reactions,
      legendaryAction
    }
  });

  return monster;
};

const exceptions = ["Half-Dragon Template"];
getContent = (group, prefix = "") => {
  let monster_list = {};
  for (let [monster_name, monster_content] of Object.entries(group)) {
    if (exceptions.includes(monster_name)) {
      continue;
    }
    if ("content" in monster_content) {
      monster_list[prefix + monster_name] = fillContent(
        monster_name,
        monster_content.content
      );
    } else {
      monster_list = {
        ...monster_list,
        ...getContent(monster_content, monster_name + ": ")
      };
    }
  }
  return monster_list;
};

listMonsters = rawdata => {
  let monster_list = {};
  let monsters = JSON.parse(rawdata).Monsters;
  for (let [category, category_content] of Object.entries(monsters)) {
    if (category.split(" ")[0] === "Monsters") {
      monster_list = { ...monster_list, ...getContent(category_content) };
    }
  }
  // console.log(monster_list);
  // console.log(monster_list["Aboleth"].description.legendaryAction);

  return monster_list;
};

linkImage = (rawdata, monster_list) => {
  let image_dict = JSON.parse(rawdata);
  for (let [monster_name, monster] of Object.entries(monster_list)) {
    name = monster.name;
    // console.log(name);
    image = image_dict[name];
    if (image) {
      monster.image = image;
    } else {
      console.error("not found: " + name);
    }
    // TODO: find not found: Elf, Drow
    // not found: Succubus/Incubus
  }
};

extractMonsters = () => {
  // console.log(fs.readdirSync('tools/json'));
  let monsters_raw = fs.readFileSync("tools/json/11 monsters.json");
  monster_list = listMonsters(monsters_raw);

  let img_raw = fs.readFileSync("tools/json/monster_img.json");
  linkImage(img_raw, monster_list);

  // console.log(monster_list);

  // saveMonsters(monster_list);
};

saveMonsters = async monsters => {
  await connectDB();
  for (monster of Object.values(monster_list)) {
    await monster.save();
  }
};

extractMonsters();
