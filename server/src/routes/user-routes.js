import express from 'express'
import User from './../models/User'
import bodyParser from 'body-parser'
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

function validateExists(required = [], keys = []) {
  let missing = required.filter(r => !keys.includes(r));
  if (missing.length) {
    return `Missing Required Parameters: ${missing.join(', ')}.`;
  }

  return null;
}

export default router
