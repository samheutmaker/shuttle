import express from 'express'
import Token from './../models/Token'
import checkToken from './../util/check-token'
import bodyParser from 'body-parser'
let jsonParser = bodyParser.json();

const router = express.Router()

router.post('/create', jsonParser, checkToken, async (req, res) => {
  let ownerId = req.user._id;
  let userTokens = await Token.find({ ownerId });
  let token = new Token();
  token.ownerId = ownerId;
  token.index = userTokens.length;
  token.created = Date.now();
  token.expires = req.body.expires || null;
  token.active = true;
  token.generateToken();

  token = await token.save();

  res.status(200).json(token);
});

router.get('/list', checkToken, async (req, res) => {
  let ownerId = req.user._id;
  let tokens = await Token.find({ ownerId });
  res.status(200).json(tokens);
});

router.put('/update', jsonParser, checkToken, async (req, res) => {
  let ownerId = req.user._id;
  let {
    _id,
    active
  } = req.body;
  let token = await Token.findOneAndUpdate({ ownerId, _id }, { active }, { new: true });
  res.status(200).json(token);
})

router.delete('/delete', jsonParser, checkToken, async (req, res) => {
  let ownerId = req.user._id;
  let {
    _id,
  } = req.body;
  let status = await Token.findOne({ ownerId, _id }).remove();
  res.status(200).json(status);
});

export default router

