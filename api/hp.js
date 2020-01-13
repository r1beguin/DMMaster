const router = require('express').Router();

const Creature = require('../db/models/Creature');

router.get('/', async (req, res) => {
    
    try {
      const creature = await Creature.findOne(req.creature);
      res.json(creature);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;