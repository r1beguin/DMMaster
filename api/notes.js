const router = require("express").Router();
const User = require("../db/models/User");
const Notes = require("../db/models/Notes");

router.post("/", async (req, res) => {
  const { name, data } = req.body.params;
  var user;

  try {
    user = await User.findOne({ name: name });
    const notes = await Notes.findOne({ user: user._id });
    if (!notes) {
      newNotes = new Notes({
        user: user._id,
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

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const user = await User.findOne({ name });
    const notes = await Notes.findOne({ user: user._id }).populate({
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
