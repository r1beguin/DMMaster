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

async function createFight(name) {
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
  return;
}

// return the user infos to a loged in user
router.get('/', async (req, res) => {
  try {
    fight = await getActiveFight();
    await res.json({ fight });
    req.io.emit('message', 'socketio')
    req.io.emit('message', fight)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post("/", async (req, res) => {
  const { type, payload } = req.body;
  
  try {
    switch(type) {

      // creates a fight with all the creatures 
      case 'CREATE_FIGHT_HTTP':
        name = payload.name
        console.log(name);
        await createFight(name);
        // need to do a querry to populate the creature fields
        fight = await getActiveFight();
        await res.json({ fight });
        break;

      // increments the turn and round counter for the current fight in the DB
      // 
      case 'NEXT_TURN_HTTP':
        // todo: add check so only active player / DM can change to next turn
        fight = await getActiveFight();
        fight.turn++;
        if (fight.turn === fight.involved.length){
          fight.turn = 0;
          fight.round++;
        }
        await fight.save();
        await res.sendStatus(200);
        console.log('emitting next turn');
        
        // using the io shared in server.js
        req.io.emit('NEXT_TURN_IO', {
          turn: fight.turn, 
          round: fight.round,
        })
        break;
    }
    

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
