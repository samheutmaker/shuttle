import express from 'express'
import User from './../models/User'
import bodyParser from 'body-parser'
import atob from 'atob'
let jsonParser = bodyParser.json();

const router = express.Router()
router.use(jsonParser);

router.post('/register', async (req, res) => {
  let missing = validateExists(['email', 'password', 'passwordCheck'], Object.keys(req.body));

  if (missing) {
    return res.status(422).json({
      error: missing
    });
  }

  let {
    email,
    password,
    passwordCheck
  } = req.body;

  if (password !== passwordCheck) {
    return res.status(422).json({
      error: 'Passwords do not match.'
    });
  }

  let existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(422).json({
      error: `Account with email ${email} already exists.`
    });
  }

  let user = new User();
  user.email = email;
  user.hashPassword(password);
  user.created = Date.now();
  user = await user.save();
  let token = user.generateToken();

  res.status(200).json({
    user: user.toJSON(),
    token,
  })
});


router.get('/login', async (req, res) => {
  let basic = req.headers.authorization;

  if (!basic) {
    return res.status(422).json({
      error: `Missing required header: 'authorization'.`
    });
  }

  let auth = basic.split(' ')[1];
  auth = atob(auth);
  auth = auth.split(':');
  let email = auth[0];
  let password = auth[1];

  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({
      error: `An account with email ${email} does not exist.`
    });
  }

  let isValid = user.comparePassword(password);

  if (!isValid) {
    return res.status(422).json({
      error: `Invalid Password.`
    });
  }

  let token = user.generateToken();

  res.status(200).json({
    user: user.toJSON(),
    token,
  })
});

function validateExists(required = [], keys = []) {
  let missing = required.filter(r => !keys.includes(r));
  if (missing.length) {
    return `Missing Required Parameters: ${missing.join(', ')}.`;
  }

  return null;
}

export default router
