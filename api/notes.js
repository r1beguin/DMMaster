const router = require("express").Router();
const User = require("../db/models/User");
const Notes = require("../db/models/Notes");
const auth = require('../utils/auth');

router.post("/", auth, async (req, res) => {
  const user_id = req.user.id;
  const { data } = req.body.params;

  try {
    const notes = await Notes.findOne({ user: user_id });
    if (!notes) {
      newNotes = new Notes({
        user: user_id,
        data: [
          {
            name: "",
            index: 0,
            edit: false,
            content: "",
          },
        ],
      });
      await newNotes.save();
    } else {
      notes.data = data;
      await notes.save();
    }

    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  // console.log(req);
  
  const user_id = req.user.id;
  try {
    const notes = await Notes.findOne({ user: user_id }).populate({
      path: "notes",
      model: Notes,
    });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
