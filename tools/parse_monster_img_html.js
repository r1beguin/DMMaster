
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;

const no_image_dict = {
  "type aberration": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/aberration.jpg",
  "type beast": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/beast.jpg",
  "type celestial": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/celestial.jpg",
  "type construct": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/construct.jpg",
  "type dragon": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/dragon.jpg",
  "type elemental": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/elemental.jpg",
  "type fey": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/fey.jpg",
  "type fiend": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/fiend.jpg",
  "type giant": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/giant.jpg",
  "type humanoid": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/humanoid.jpg",
  "type monstrosity": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/monstrosity.jpg",
  "type ooze": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/ooze.jpg",
  "type plant": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/plant.jpg",
  "type undead": "https://www.dndbeyond.com/content/1-0-814-0/skins/waterdeep/images/icons/monsters/undead.jpg",
}

extractMonsters = () =>{
  // console.log(fs.readdirSync('tools/json'));
  const monster_imgs = {}
  const dir = 'tools/html/'
  var files = fs.readdirSync('tools/html');
  // let txt = '/tools/html/Monsters 1.html';
  for (file of files){
    let rawdata = fs.readFileSync(dir + file, 'utf8');
    // console.log(rawdata);
    
    const jsdom = new JSDOM(rawdata)
    const { window } = jsdom;
    
    var div_list = jsdom.window.document.getElementsByClassName("info") 
    for(info_div of div_list){
      var name_div = info_div.childNodes[5];
      var icon_div = info_div.childNodes[1];
      var img_div = icon_div.childNodes[1];

      var name = name_div.childNodes[1].childNodes[1].innerHTML

      console.log(name);
      
      var image;
      var thumbnail;
      if(img_div.innerHTML){
        image = img_div.getAttribute("href");
        thumbnail = img_div.childNodes[1].getAttribute("style").split("\'")[1];

      } else {
        link = no_image_dict[img_div.className]
        image = link;
        thumbnail = link;
      }
      monster_imgs[name] = {
        image, 
        thumbnail,
      }
    }
  }
  fs.writeFileSync("tools/json/monster_img.json", JSON.stringify(monster_imgs, null, 4))
}

extractMonsters();