var http = require('http'),
    httpProxy = require('http-proxy'),
    connect = require('connect'),
    express = require('express');
//
// Basic Connect App
//


var change = function (){
  return function (req, res, next) { //restreame
    console.log("changing");
    var _write = res.write;

    res.write = function (data) {
      _write.call(res, data.toString().replace("Ruby", "nodejitsu"));
    }
    next();
  }
}
var proxy_app = connect();
var proxy = httpProxy.createProxyServer({target:'http://localhost:8000'});
//proxy_app.use(change);
proxy_app.use(
  function (req, res) {
    proxy.web(req, res);
  });
http.createServer(proxy_app).listen(9000,function(){
  console.log("Proxy is listing on 9000");
});

// proxy_app.use(
//   function (req, res, next) {
//     var _write = res.write;

//     res.write = function (data) {
//       _write.call(res, data.toString().replace("Ruby", "nodejitsu"));
//     }
//     next();
//   }
//   );//json
// http.createServer(proxy_app).listen(5050);

//
// Basic Http Proxy Server
//


//Target Http Server

proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
  res.end("Proxy is working");
});

/*
http.createServer(function (req, res) {
 res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(8000);
*/
var target_app = express();
target_app.get('', function (req, res) {
   res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, I know Ruby\n');
});
target_app.listen(8000);
/*
target_app.listen(8000, function () {
  console.log('Example app listening on port 3000!');
});
*/