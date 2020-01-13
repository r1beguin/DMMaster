const router = require('express').Router();
const auth = require('../utils/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../db/models/User');


// return the user infos to a loged in user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// wait for a login form
// if user in the database, returns a connection token
router.post(
  '/',
  // TODO: use express validator here if more complicated form
  // use bcrypt for passwords
  async (req, res) => {
    const { name } = req.body;

    try {
      let user = await User.findOne({ name });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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
