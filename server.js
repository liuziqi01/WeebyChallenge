var http = require('http'),
connect = require('connect'),
httpProxy = require('http-proxy'),
express = require('express');
path = require('path');






var selects = [];
var simpleselect = {};

simpleselect.query = '[src]';
simpleselect.func = function (node) {
 // node = node.getAttribute("src","");
 
    console.log(node.name);

  console.log("find a target");
  /*
          //Create a read/write stream wit the outer option 
      //so we get the full tag and we can replace it
      var stm = node.createStream({ "outer" : true });
    //  var writeStm = node.createWriteStream();

    //variable to hold all the info from the data events
    var tag = '';

    //collect all the data in the stream
    stm.on('data', function(chunk) {
     tag += chunk;
   });


    //When the read side of the stream has ended..
    stm.on('end', function() {

      //Print out the tag you can also parse it or regex if you want
      process.stdout.write('tag:   ' + tag + '\n');
      process.stdout.write('end:   ' + node.name + '\n');

      stm.end('<img src = \"http://localhost:9000/handleUnsafeReq?oriUrl=\" height=\"42\" width=\"42\"');
     
  

    );
*/
node.setAttribute("src", "http://localhost:9000/handleUnsafeReq?oriUrl=");


};
  selects.push(simpleselect);


        //
        // Basic Connect App
        //
        //var app = connect();
        var proxy_app = connect();
        var target_app = express();
        require('./routes')(target_app);

        target_app.use(express.static(__dirname + '/public'));
        target_app.set('views', path.normalize(__dirname) + '/public/html');
        target_app.set('view engine', 'html');
        target_app.engine('html', require('ejs').renderFile);


        var proxy = httpProxy.createProxyServer({
          target: 'http://localhost:9000'
        })

        //Additional true parameter can be used to ignore js and css files. 
        //app.use(require('../')([], selects, true));

        proxy_app.use(require('harmon')([], selects));

        proxy_app.use(function (req, res) {
                 
                 //res.send("Hello world, from proxy");
                 proxy.web(req, res);
               });

        http.createServer(proxy_app).listen(8000); //proxy server
       // http.createServer(target_app).listen(9000);
       target_app.listen(9000);
        /*
        http.createServer(function (req, res) {
         res.writeHead(200, { 'Content-Type': 'text/html' });
         res.write('<html><head></head><body><img src="http://comps.canstockphoto.com/can-stock-photo_csp14290776.jpg" height="42" width="42"><div class="a">Nodejitsu Http Proxy</div></body></html>');
         res.end();
       }).listen(9000);

       */