var http = require('http'),
connect = require('connect'),
httpProxy = require('http-proxy'),
express = require('express');
path = require('path');


 
var target_app = express();
  target_app.use(express.static(__dirname + '/public'));
target_app.set('views', path.normalize(__dirname) + '/public/html');
        target_app.set('view engine', 'html');
        target_app.engine('html', require('ejs').renderFile);

  require('./routes')(target_app);

  target_app.listen(8000); // target server
      /*
        var target_app = express();
        
      require('./proxy_routes')(proxy_app);

        
      
        
         proxy_app.use(express.static(__dirname + '/public'));
        proxy_app.set('views', path.normalize(__dirname) + '/public/html');
        proxy_app.set('view engine', 'html');
        proxy_app.engine('html', require('ejs').renderFile);
      */
var proxy = httpProxy.createProxyServer({
              target: 'http://localhost:8000'
        });
var proxy_app = express();
require('./proxy_routes')(proxy_app);
//proxy_app.use("/",require('harmon')([], selects));
require('./proxy_rewrite')(proxy_app);
proxy_app.use(
  function (req, res) {
      proxy.web(req, res);          
  },
  express(express.static(__dirname + '/public'))
  );

    
    
proxy_app.set('views', path.normalize(__dirname) + '/public/html');
        proxy_app.set('view engine', 'html');
        proxy_app.engine('html', require('ejs').renderFile);
    //app.use(app.router);    
//
//proxy_app.use(require('./proxy_routes'));
var proxy_app = http.createServer(proxy_app).listen(9000);

//proxy_app.use(change);
//proxy_app.use(
//   function (req, res, next) {
//     var _write = res.write;

//     res.write = function (data) {
//       _write.call(res, data.toString().replace("normal","proxy"));
//     }
//     next();
//   });
// proxy_app.use(
//   function (req, res) {
   
//     proxy.web(req, res);
//   });



// http.createServer(proxy_app).listen(9000,function(){
//   console.log("Proxy is listing on 90s00");
// });



  // proxy_app.on('proxyRes', function (proxyRes, req, res) {
  //   console.log("modified");
        
  //     });
  // proxy_app.on('proxyReq', function (proxyRes, req, res) {
  //   console.log("Received req");
            
  //     });




/*

var selects = [];
var simpleSrc = {};
var getImg ={};
var simpleHref= {};
var simpleScript={};


simpleSrc.query = '[src]';
simpleSrc.func = function (node) {
 
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

node.setAttribute("src", "http://localhost:8000/handleUnsafeReq?oriUrl="+node.getAttribute("src") + "&tag=" + node.name);


};
simpleHref.query = 'a[href]';
simpleHref.func = function(node){
  //console.log(node.name);
  //console.log("Find a target in href");
  node.setAttribute("href","tag=href&"+"http://localhost:8000/handleUnsafeReq?oriUrl="+node.getAttribute("href"));
}


simpleScript.query='script[src]';
simpleScript.func = function(node){
   //console.log("Find a target in script tag");
  node.setAttribute("src","http://localhost:8000/handleUnsafeScript?oriUrl="+node.getAttribute("src"));
};

getImg.query = 'img';
getImg.func = function(node){
  if(node.getAttribute('src').substring(0,4) =='http'){
    node.setAttribute('src',"http://localhost:8000/handleUnsafeImg?oriUrl="+node.getAttribute("src"))
  }
}


 // selects.push(simpleSrc);
  //selects.push(simpleHref);
  //selects.push(simpleScript);
  //selects.push(getImg);


        //Additional true parameter can be used to ignore js and css files. 
        //app.use(require('../')([], selects, true));

        //proxy_app.use(require('harmon')([], selects));

        // proxy_app.use(function (req, res) {
        //          proxy.web(req, res);
        //        });

      var target_app = http.createServer(function(req,res){
            proxy_app.web(req, res, {target:'http://localhost:8000'});
               });//proxy server
       


     


*/


