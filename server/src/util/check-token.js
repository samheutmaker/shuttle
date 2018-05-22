import User from './../models/User'
import jwt from 'jsonwebtoken'
import {
  JWT_TOKEN_SECRET
} from './../env';

export default function (req, res, next) {
  let decoded;
  try {
    decoded = jwt.verify(req.headers.token, JWT_TOKEN_SECRET);
  } catch (e) {
    return res.status(400).json({
      msg: 'Error Authenticating user'
    });
  }
  User.findOne({
    _id: decoded.id
  }, (err, user) => {
    if (err || !user) {
      res.status(401).json({
        msg: 'Error finding user (AUTH)'
      });
    }
    req.user = user;
    next();
  });
}
