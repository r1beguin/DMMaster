const fs = require('fs');
const Creature = require("../db/models/Monster");

getAttribute = (content_array, header) => {
  for(attribute of content_array){
    
    if(typeof(attribute) === "string" && attribute.includes(header)) {
      return attribute.split(header).join('');
    }
  }
  return null;
}

fillContent = (monster_name, monster_content) => {
  console.log(monster_name);

  // stats extraction
  var stats ={};
  for (let [key, value] of Object.entries( monster_content[4].table)) {
    stats[key] = value[0];
  }

  // attribures extraction
  const required_attributes = {
    senses: "**Senses** ",
    languages: "**Languages** ",
    challenge: "**Challenge** ",
  };
  const optional_attributes = {
    skills: "**Skills** ",
    saving: "**Saving Throws** ",
    resistances: "**Damage Resistances** ",
    immunities: "**Condition Immunities** ",
  };
  var attributes = {};
  for([key, header] of Object.entries(required_attributes)){
    attributes[key] = getAttribute(monster_content, header);
  }
  for([key, header] of Object.entries(optional_attributes)){
    body =  getAttribute(monster_content, header);
    if (body !== null) attributes[key] = body;
  }

  // traits extraction
  // find first line after "Challenge"
  var index = 5;
  while (!monster_content[index++].includes("**Challenge**")) {}
  traits = [];
  // get all the lines before Actions
  while (index < monster_content.length && !monster_content[index].includes("**Actions**")){
    traits.push(monster_content[index])
    index++;
  }

  var index = 5;
  while (index < monster_content.length && !monster_content[index++].includes("**Actions**")) {}
  actions = [];
  // get all the lines before Actions
  while (index < monster_content.length){
    line = monster_content[index];
    // break when entering another category
    if (line.slice(0, 2) === "**" && line.slice(0, 3) !== "***") break; 
    actions.push(line);
    // str_list = monster_content[index].split("***") 
    // if (str_list.length === 1){
    //   actions.push({
    //     header: "",
    //     body: str_list[0]
    //   });
    // } else {
    //   actions.push({
    //     header: str_list[1],
    //     body: str_list[2]
    //   });
    // }
    index++;
  }



  // TODO: 
  // copy monster json
  // revert file
  // compare changes
  // only fix big mistakes, keep iner **
  // no need for header / body




  console.log(actions);
  

  // actions extraction
  var actions = {};

  // todo: nodes last index
  monster = new Monster({
    name: monster_name,
    meta: monster_content[0].split('*').join(''), // removes '*' around
    ac: getAttribute(monster_content, "**Armor Class** "),
    hp: getAttribute(monster_content, "**Hit Points** "),
    speed: getAttribute(monster_content, "**Speed** "),
    stats, 
    attributes,
    description: {
      traits,
      actions
    }
  });


  return monster
}

const exceptions = [
  "Half-Dragon Template",
];
getContent = (group, prefix="") => {
  let monster_list = {};
  for (let [monster_name, monster_content] of Object.entries(group)) {
    if (exceptions.includes(monster_name)){
      continue;
    }
    if ('content' in monster_content){
      monster_list[prefix + monster_name] =  fillContent(prefix + monster_name, monster_content.content);
    } else {
      monster_list = {...monster_list, ...getContent(monster_content, monster_name + ': ')};
    }
  }
  return monster_list;
}

listMonsters = (rawdata) =>{
  let monster_list = {};
  let monsters = JSON.parse(rawdata).Monsters;
  for (let [category, category_content] of Object.entries(monsters)) {
    if(category.split(' ')[0] === "Monsters") {
      monster_list = {...monster_list, ...getContent(category_content)};
      
    }
  }

  // console.log(Object.keys(monster_list));
  // console.log(monster_list);
  // console.log(monster_list["Aboleth"].description.traits);
  

}


extractMonsters = () =>{
  // console.log(fs.readdirSync('tools/json'));
  let rawdata = fs.readFileSync('tools/json/11 monsters.json');
  listMonsters(rawdata);
}

extractMonsters();