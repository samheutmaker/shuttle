let express = require('express'),
  app = express(),
  httpProxy = require('http-proxy'),
  proxy = httpProxy.createProxyServer({});

const PORT = 3333;


app.use('/', (req, res) => {
  let token = req.headers['proxy-authorization'];
  console.log(req.headers);

  if (true) {
    delete req.headers['proxy-authorization'];
    delete req.headers['proxy-connection'];
    console.log(req.headers);
    proxy.web(req, res, {
      target: 'http://34.219.166.80:8080/'
    });
  } else {
    res.status(400).json({
      error: 'Invalid API Token'
    });
  }
})


app.listen(PORT, () => console.log(`Server live on ${PORT}`))