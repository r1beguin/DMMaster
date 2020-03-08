const router = require("express").Router();
const config = require("config");
const Creature = require("../db/models/Creature");
const User = require("../db/models/User");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");

// return the user infos to a loged in user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const creature = await Creature.findOne({ user }).populate({
      path: "user",
      model: User
    });
    res.json(creature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/creature", auth, async (req, res) => {
  try {
    const creature = await Creature.findOne(req.query);
    res.json(creature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

async function updateCreature(creature, hp, alive) {
  creature.hp = hp;
  creature.alive = alive;

  await creature.save();
}

async function addCreature(
  name,
  hp,
  role,
  avatar,
  user = null,
  monster = null
) {
  if (!avatar) {
    if (role == "player") {
      avatar =
        "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/characters/default-avatar-builder.png";
    } else {
      avatar =
        "https://www.dndbeyond.com/Content/1-0-787-0/Skins/Waterdeep/images/icons/monsters/beast.jpg";
    }
  }
  creature = new Creature({
    name,
    role,
    hp,
    alive: true,
    avatar
  });
  if (user) creature.user = user._id;
  if (monster) creature.monster = monster._id;

  await creature.save();
  return creature;
}

// wait for a login form
// if user in the database, returns a connection token
router.post("/", async (req, res) => {
  const { id, name, role, hp, alive = true, avatar } = req.body;
  var creature;
  console.log(name, hp, role);

  try {
    // TODO: perhaps split body into {action, payload} with a switch on the actions
    if (id) {
      // update by ID
      creature = await Creature.findById(id);
      if (creature) {
        await updateCreature(creature, hp, alive);
      } else {
        // bug
        throw "ID not found in creatures";
      }
    } else {
      // new creature or update ?
      switch (role) {
        case "player":
          // check if already player creature
          creature = await Creature.findOne({ name, role });
          if (creature) {
            // if it existe, update it (here for HP change)
            await updateCreature(creature, hp, alive);
          } else {
            // else create it and bind the creature and player together
            const user = await User.findOne({ name });
            if (user) {
              creature = await addCreature(name, hp, role, avatar, user);
              user.creature = creature._id;
              await user.save();
            } else {
              // bug
              throw "cannot instanciate player creature without a valid user";
            }
          }
          break;
        case "monster":
        default:
          // when nothing specified, add a new creature
          // todo: bind it to a monster
          creature = await addCreature(name, hp, role);
          break;
      }
    }
    res.json({ creature });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
