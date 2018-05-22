import mongoose from 'mongoose'
import CryptoJS from 'crypto-js'
import btoa from 'btoa'
import atob from 'atob';
import {
  API_TOKEN_SECRET
} from './../env';

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
  },
  ownerId: {
    type: String,
  },
  index: {
    type: Number,
  },
  created: {
    type: Number,
  },
  expires: {
    type: Number
  },
  active: {
    type: Boolean
  }
});

class Token {

  generateToken() {
    let value = `${this.ownerId}:${this.index}`;
    let ciphertext = CryptoJS.AES.encrypt(value, API_TOKEN_SECRET);
    ciphertext = btoa(ciphertext.toString());
    this.token = ciphertext.substring(0, ciphertext.length - 2);
  }

  static decrypt(token) {
    token = atob(token + '==');
    let bytes = CryptoJS.AES.decrypt(token, API_TOKEN_SECRET);
    let plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }


}

tokenSchema.loadClass(Token);

export default mongoose.model('token', tokenSchema);
