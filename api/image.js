const router = require("express").Router();
const Image = require("../db/models/Image");

router.post("/", async (req, res, next) => {

    const newImage = new Image({
        imageName: req.body.imageName,
        imageData: req.body.imageData
    });

    newImage.save().then((result)=>{
        res.status(200).json({
            success:true,
            document:result
        })
    }).catch((err)=>next(err))

});

router.get("/", async (req, res) => {
    try {
     
      const image = await Image.findOne().populate({
        path: 'image',
        model: Image,
      });
      res.json(image);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
