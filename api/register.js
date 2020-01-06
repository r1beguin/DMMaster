const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../db/models/User');

// wait for a register form
// if not in the database, adds it, then returns a connection token
// for now, the form is only name and role.
router.post(
  '/',
  async (req, res) => {
    const { name, role } = req.body;
    console.log(name, role)

    try {
      let user = await User.findOne({ name: name });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        role
      });

      // saves user to db
      await user.save();

      // token creation
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
