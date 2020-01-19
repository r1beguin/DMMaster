const router = require('express').Router();
const config = require('config');
const Fight = require('../db/models/Fight');
const Creature = require('../db/models/Creature');

async function getActiveFight() {
  fight = await Fight.findOne({active:true})
  .populate({
    path: 'involved.creature',
    model: Creature,
  })
  return fight;
}

// return the user infos to a loged in user
router.get('/', async (req, res) => {
  try {
    fight = await getActiveFight();
    await res.json({ fight });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// creates a fight with all the creatures 
router.post("/", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {

    creatures = await Creature.find();
    const involved = creatures.map(creature => {
      return {
        creature: creature.id,
        initiative: Math.floor(Math.random() * 20),
      }
    });
    // sort them by initiative
    involved.sort(function(a, b){return b.initiative - a.initiative});

    var fight = new Fight({
      name,
      active: true,
      round: 0,
      turn: 0,
      involved,
    })
    await fight.save();

    // need to do a querry to populate the creature fields
    fight = await getActiveFight();

    await res.json({ fight });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
