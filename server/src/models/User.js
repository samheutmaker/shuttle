import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  JWT_TOKEN_SECRET
} from './../env';

const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  created: {
    type: Number,
  },
  active: {
    type: Boolean,
  }
});

class User {
  toJSON() {
    return {
      email: this.email,
      created: this.created,
      active: this.active,
      _id: this._id,
      __v: this.__v,
    }
  }
  hashPassword(password) {
    this.password = bcrypt.hashSync(password, 8);
  }
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  generateToken() {
    return jwt.sign({
      id: this._id,
      created: Date.now(),
    }, JWT_TOKEN_SECRET);
  }
}

userSchema.loadClass(User);

export default mongoose.model('user', userSchema);
