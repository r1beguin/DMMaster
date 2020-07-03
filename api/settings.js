const {Settings} = require("../db/models/Settings");

const router = require("express").Router();
const User = require("../db/models/User");
const auth = require('../utils/auth');

router.post("/", auth, async (req, res) => {
  if (!req.user || !req.body || !req.body.params) {
    res.status(400).send()
  }
  const user_id = req.user.id;
  const { data } = req.body.params;

  try {
    const user = await User.findById(user_id)
    if (!user) {
      res.status(401).send("User not logged in");
    } else if (!user.settings) {
      const newSettings = new Settings({...data})
      await newSettings.save()
      await User.updateOne({_id: user_id}, {settings: newSettings})
      res.status(200).send()
    } else {
      await Settings.updateOne({_id: user.settings}, {...data})
      res.status(200).send()
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
