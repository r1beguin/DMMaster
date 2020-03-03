const router = require("express").Router();
const Image = require("../db/models/Image");

router.post("/", async (req, res, next) => {
  const newImage = new Image({
    imageName: req.body.imageName,
    imageData: req.body.imageData
  });

  newImage
    .save()
    .then(result => {
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch(err => next(err));
  req.io.emit("message", newImage);
});

router.get("/getImage", async (req, res) => {
  try {
    console.log(req.query);
    const image = await Image.findById(req.query.id);
    res.json(image);
    //req.io.emit("message", image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/imagesList", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
