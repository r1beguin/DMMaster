const fs = require("fs");
const Creature = require("../db/models/Monster");
const {connectDB, disconnectDB} = require("../db/db");
const { parseStats, parseHP, parseChallenge, parseSaving } = require("./detailed_parsers")

// find the attribute string from content array of a monster and the header string
getAttribute = (content_array, header) => {
  for (var attribute of content_array) {
    if (typeof attribute === "string" && attribute.includes(header)) {
      return attribute.split(header).join("");
    }
  }
  return null;
};

// from the raw content of the monster, parse every bit and create a monster model
parseMonster = (monster_name, monster_content) => {

  // header 
  var name = monster_name;
  var meta = monster_content[0].split("*").join(""); // removes '*' around

  // are those attributes ? parsing
  // to put in the attributes_infos
  var ac =          getAttribute(monster_content, "**Armor Class** ");
  var hp = parseHP( getAttribute(monster_content, "**Hit Points** "));
  var speed =       getAttribute(monster_content, "**Speed** ");

  // stats parsing
  var stats = {};
  for (var [key, value] of Object.entries(monster_content[4].table)) {
    stats[key] = parseStats(value[0]);
  }

  // attribures parsing
  const attributes_infos = {
    senses:       { header: "**Senses** ",                required: true,   parser: null },
    languages:    { header: "**Languages** ",             required: true,   parser: null },
    challenge:    { header: "**Challenge** ",             required: true,   parser: parseChallenge },
    skills:       { header: "**Skills** ",                required: false,  parser: null },
    saving:       { header: "**Saving Throws** ",         required: false,  parser: parseSaving },
    resistances:  { header: "**Damage Resistances** ",    required: false,  parser: null },
    immunities:   { header: "**Condition Immunities** ",  required: false,  parser: null }
  };
  var attributes = {};
  for (var [key, { header, required, parser }] of Object.entries(attributes_infos)) {
    var body = getAttribute(monster_content, header);
    if (body !== null) {
      attributes[key] = body
      if (parser) {
        attributes[key] = parser(attributes[key]);
      }
    } else if (required) {
      error("missing argument")
    }
  }

  // traits parsing
  // find first line after "Challenge"
  var index = 5;
  while (!monster_content[index++].includes("**Challenge**")) {}
  var traits = [];
  // get all the lines before Actions
  while (
    index < monster_content.length &&
    !monster_content[index].includes("**Actions**")
  ) {
    traits.push(monster_content[index]);
    index++;
  }

  // actions parsing
  var index = 5;
  // find first line after "Action"
  while (
    index < monster_content.length &&
    !monster_content[index++].includes("**Actions**")
  ) {}
  var actions = [];
  // get all the lines before Actions
  while (index < monster_content.length) {
    var line = monster_content[index];
    // break when entering another category
    if (line.slice(0, 2) === "**" && line.slice(0, 3) !== "***") break;
    actions.push(line);
    index++;
  }

  // reactions parsing
  var index = 5;
  // find first line after "Reactions"
  while (
    index < monster_content.length &&
    !monster_content[index++].includes("**Reactions**")
  ) {}
  var reactions = [];
  // get all the lines before Actions
  while (index < monster_content.length) {
    var line = monster_content[index];
    // break when entering another category
    if (line.slice(0, 2) === "**" && line.slice(0, 3) !== "***") break;
    reactions.push(line);
    index++;
  }

  // reactions parsing
  var index = 5;
  // find first line after "Legendary Actions"
  while (
    index < monster_content.length &&
    !monster_content[index++].includes("**Legendary Actions**")
  ) {}
  var legendaryAction = [];
  // get all the lines before Actions
  while (index < monster_content.length) {
    var line = monster_content[index];
    // break when entering another category
    if (line.slice(0, 2) === "**" && line.slice(0, 3) !== "***") break;
    legendaryAction.push(line);
    index++;
  }

  // TODO: notes last index
  var monster = new Monster({
    name,
    meta,
    ac,
    hp,
    speed,
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

// for a given category parse all monsters inside
// call recursively when cateogories inside category
// prefix is used to keep track of the current category, not really used
parseCategoryContent = (category_content, prefix = "") => {
  const exceptions = ["Half-Dragon Template"];
  var monsters = {};
  for (var [monster_name, monster_content] of Object.entries(category_content)) {
    if (exceptions.includes(monster_name)) {
      // unparseable data but still interesting to keep
      continue;
    }
    if ("content" in monster_content) {
      // add a monster to the dict
      monsters[prefix + monster_name] = parseMonster(
        monster_name,
        monster_content.content
      );
    } else {
      // recursive call when sub categories
      monsters = {
        ...monsters,
        ...parseCategoryContent(monster_content, monster_name + ": ")
      };
    }
  }
  return monsters;
};

// from the monster json sting, create a dictionary of monster names and their mongo model
// it goes through all monster in each categories and parse the content
parseAllMonsters = monster_rawdata => {
  var monsters = {};
  var monster_dict = JSON.parse(monster_rawdata).Monsters;
  for (var [category, category_content] of Object.entries(monster_dict)) {

    // monsters are organized by "first letter categories".
    // this appends the monsters of each categories
    if (category.split(" ")[0] === "Monsters") {
      monsters = { ...monsters, ...parseCategoryContent(category_content) };
    }
  }

  return monsters;
};

// link image dict with monsters to fill their image object
linkImage = (image_rawdata, monsters) => {
  var image_dict = JSON.parse(image_rawdata);
  for (var [monster_name, monster] of Object.entries(monsters)) {
    var name = monster.name;
    var image = image_dict[name];
    if (image) {
      monster.image = image;
    } else {
      console.error("not found: " + monster_name);
    }
    // TODO: find not found: Elf, Drow
    // not found: Succubus/Incubus
  }
};


// save all the monsters to the DB
// monster with incomplete data (ex no image) will not be saved
saveMonsters = async (monsters) => {
  await connectDB();
  for (var monster of Object.values(monsters)) {
    try {
      await monster.save();
    } catch (error) {
      console.log(error);
    }
  }
  // not working cuently for some reason
  await disconnectDB;
};

// from a monster json file, parse all monsters
// from an image json file, get all images
// link the two together
// save the monsters to the DB
extractMonstersFromFile = (monster_file, image_file) => {
  var monsters_raw = fs.readFileSync(monster_file);
  var img_raw = fs.readFileSync(image_file);

  var monsters = parseAllMonsters(monsters_raw);
  linkImage(img_raw, monsters);

  // console.log(monsters);
  saveMonsters(monsters);
};

// main starts here
extractMonstersFromFile("tools/json/11 monsters.json", "tools/json/monster_img.json");
// main ends here
