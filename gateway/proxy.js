let express = require('express'),
  app = express(),
  httpProxy = require('http-proxy'),
  proxy = httpProxy.createProxyServer({});

const {
  HTTP_PORT
} = require('./src/env');


app.use('/', (req, res) => {
  let token = req.headers['proxy-authorization'];
  console.log(req);

  if (true) {
    delete req.headers['proxy-authorization'];
    delete req.headers['proxy-connection'];
    console.log(req.headers);
    // proxy.web(req, res, {
    //   target: 'http://34.219.166.80:8080/'
    // });
    var ip = (req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress).split(",")[0];
    console.log(ip);
    res.status(200).send(req.headers.host)
  } else {
    res.status(400).json({
      error: 'Invalid API Token'
    });
  }
})


app.listen(HTTP_PORT, () => console.log(`Server live on ${HTTP_PORT}`))