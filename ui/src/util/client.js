import btoa from 'btoa'
import request from 'superagent'


class Client {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.token = null;
  }
  // Internal
  _getUrl(slug) {
    return `${this.baseUrl}${slug}`;
  }
  _defaultHeaders() {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (this.token) {
      headers.token = this.token
    };
    return headers;
  }
  _setToken(token) {
    this.token = token;
  }
  _handleError(error) {
    throw error;
  }
  _handleHTTPError(error) {
    console.error(error)
    let msg;
    try {
      msg = JSON.parse(error.response.text);
    } catch (e) {
      msg = error.response.text;
    }
    throw msg;
  }
  // Requests
  get(slug = '', headers = {}) {
    return request
      .get(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .catch(this._handleHTTPError);
  }
  post(slug = '', data = {}, headers = {}) {
    return request
      .post(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  put(slug = '', data = {}, headers = {}) {
    return request
      .put(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  delete(slug = '', data = {}, headers = {}) {
    return request
      .delete(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  // Authentication
  login(email, password) {
    let authorization = 'Basic ' + btoa(`${email}:${password}`);
    return this
      .get('/auth/login', {
        authorization
      })
      .then(res => {
        this._setToken(res.body.token);
        return res.body;
      })
      .catch(this._handleError);
  }
  register(registerData) {
    return this
      .post('/auth/register', registerData)
      .then(res => {
        this._setToken(res.body.token);
        return res;
      })
      .then(res => {
        console.log(res.body)
        return res.body;
      })
      .catch(this._handleError);
  }
  // Addresses
  createAddress(address) {
    return this
      .post('/address/new', address)
      .then(res => res.body)
      .catch(this._handleError);
  }
  listAddresses() {
    return this
      .get('/address/list')
      .then(res => res.body)
      .catch(this._handleError);
  }
  updateAddress(address) {
    return this
      .put('/address/update', address)
      .then(res => res.body)
      .catch(this._handleError);
  }
  deleteAddress(id) {
    return this
      .delete('/address/delete', { id: id })
      .then(res => res.body)
      .catch(this._handleError);
  }
  // Products
  createProduct(product) {
    return this
      .post('/products/new', product)
      .then(res => res.body)
      .catch(this._handleError);
  }
  listProducts() {
    return this
      .get('/products/list')
      .then(res => res.body)
      .catch(this._handleError);
  }
  updateProduct() {

  }
  deleteProduct() {

  }
  deleteAllProducts() {

  }
  // SKU
  createSKU(sku) {
    return this
      .post('/sku/new', sku)
      .then(res => res.body)
      .catch(this._handleError);
  }
  listSKUS() {
    return this
      .get('/sku/list')
      .then(res => res.body)
      .catch(this._handleError);
  }
  // Cart
  updateCart(skuId, quantity) {
    return this
      .post('/cart/update', {
        skuId,
        quantity
      })
      .then(res => res.body)
      .catch(this._handleError);
  }
  // Order
  createOrder(cart, address) {
    return this
      .post()
  }
  listShippingRates(cart, address) {

  }
}

let client = new Client('http://localhost:8080');

let user = {
  firstName: 'Wyatt',
  lastName: 'Pefley',
  email: 'samheutmaker@gmail.com',
  password: 'kingpin13',
  passwordCheck: 'kingpin13',
  ZIP: '59860'
};

let address = {
  country: 'United States',
  fullName: 'Sam Heutmaker',
  street: '5002 Ravenna Ave NE',
  suite: '',
  city: 'Seattle',
  state: 'WA',
  zip: '98105',
  phone: '406-210-4444'
};

let product = {
  active: true,
  attributes: ['size', 'color'],
  caption: 'How nice can something look on you?',
  description: 'A nice shirt',
  livemode: true,
  metadata: { meta: 'label' },
  name: 'Nice Hawaiian Shirt',
  shippable: true,
  statementDescriptor: 'Sick store charged ya buh'
}

let sku = {
  productId: "",
  sku: "2",
  active: true,
  attributes: {
    size: "M",
    color: 'white'
  },
  description: "This is a dope tank",
  currency: 'usd',
  quantity: 100,
  livemode: true,
  metadata: {
    a: "meta"
  },
  price: 10000,
  mediaList: [],
  shipping: {
    length: "10",
    width: 10,
    height: 10,
    distanceUnit: 'in',
    weight: 454,
    massUnit: 'grams',
  },
}

testUpdateCart();

function testRegisterUser() {
  return client.register(user);
}

function testUpdateCart() {
  client.login(user.email, user.password)
    .then(() => client.listSKUS())
    .then(res => {
      return Promise.all(res.map(sku => client.updateCart(sku._id, 10)))
    })
    .then(res => console.log(res))
    .catch(error => console.log(error));
}



function testAddress() {
  client.login(user.email, user.password)
    .then(() => client.createAddress(address))
    .then(() => client.listAddresses())
    .then(res => {
      let address = res.pop();
      address = {
        ...address,
        fullName: 'Natalie Slonaker'
      }
      return address
    })
    .then(address => client.updateAddress(address))
    .then(address => client.deleteAddress(address._id))
    .then(res => console.log(res))
    .catch(error => console.log(error.msg));

}