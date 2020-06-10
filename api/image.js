const router = require("express").Router();
const Image = require("../db/models/Image");
const ImageManifest = require("../db/models/ImageManifest");
var sizeOf = require('image-size');

router.get("/", async (req, res) => {
  try {
    const image = await Image.findById(req.body.id);
    res.json(image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// returns image list
router.get("/list", async (req, res) => {
  try {
    const images = await Image.find({active: {$exists: false}});
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Create image manifest. Should only be called if the image manifest has been deleted 
router.post("/init", async (req, res) => {
  try {
    const image = await Image.findOne()
    const imageManifest = new ImageManifest({
      active: image._id
    })
    // console.log(imageManifest);
    await imageManifest.save()
    res.json(imageManifest)
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Return the current active map
router.get("/active", async (req, res) => {
  console.log("get active map")
  try {
    const imageManifest = await ImageManifest.findOne({active: {$exists: true}})
    const image = await Image.findById(imageManifest.active);
    res.json(image);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Change active map on on the DB, then broadcast a change notice to everyone
router.post("/active", async (req, res) => {
  
  console.log("set active map", req.body);
  try {
    // find the image manifest by looking for the document with the 'active' field
    const query = {active: {$exists: true}};
    const update = {active: req.body.id};
    const options = {new: true };
    const imageManifest = await ImageManifest.findOneAndUpdate(query, update, options)
    // console.log(imageManifest);
    res.json(imageManifest)

    // notify everyone connected to get the new map
    req.io.emit('CHANGE_MAP_IO', {})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Store uploaded image on DB
// TODO: thumbnail
router.post("/upload", async (req, res, next) => {
  var img = Buffer.from(req.body.data.substr(22), 'base64');
  var dimensions = sizeOf(img);
  console.log(dimensions.width, dimensions.height);
  const newImage = new Image({
    name: req.body.name,
    data: req.body.data,
    width: dimensions.width, 
    height: dimensions.height
  });

  // TODO: async await
  newImage
    .save()
    .then(result => {
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch(err => next(err));
});


module.exports = router;
