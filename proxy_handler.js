
fs = require('fs');
url = require('url');
http = require('http');
request = require('request');

exports.index = function(req, res) {
	res.render('ziqi.html');
}



exports.handleUnsafeScript = function(req,res){
  //res.end("This is proxy");
    console.log("This is proxy ");
    var oriUrl=req.query.oriUrl;
     res.writeHead(200, {'Content-Type': 'text/javascript' });
    console.log(oriUrl);
   if(oriUrl.substring(0,4)!="http"){
   var data=fs.readFileSync(oriUrl).toString();
readFile(data,res);
res.end();
}

else{
console.log("request script from http %s",oriUrl);

var rem = request(oriUrl);
  rem.on('data', function(chunk) {
    readFile(chunk.toString(),res);
  });
  rem.on('end', function() {
    res.end();
  });
}

};


exports.handleUnsafeImg= function(req, res) {

   // console.log("This is proxy - I should request img from %s",req.query.oriUrl);

    var oriUrl = req.query.oriUrl;  

    if(req.query.tag=="href"){
        res.send(oriUrl);
        console.log("trying");
    }
    else{
    var img;
    if(oriUrl.substring(0,4) == "http"){
        img = fs.readFileSync('./public/img/safe.jpg');
    }
    else{
        img = fs.readFileSync("./public" + oriUrl);
    }
      
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');}
};


exports.unsafe = function(req, res) 
{

 res.render('unsafe.html');
  
};

exports.adsafeFile = function(req, res) 
{

  res.sendFile(__dirname + '/public/html/Scripts/adsafe.js')
  
};

exports.focus = function(req, res){
  res.send("proxy is working");
}


var readFile = function(data,res){
    var lines = data.split(';');
    res.write("ADSAFE.go('ADSAFE_', function (document, lib) {'use strict';");
    lines.forEach(function(l){


    var fileString = l.split('\n');
    fileString.forEach(function(line){
      line = translate(line);  
        var domFound= false;


        /*
    for (var i = 0, len = line.length; i < len; i++) {
         if(line[i]=='d' && line.substring(i,i+9)=='document.'){
             domFound=true;
        }
     }
    */

    if(domFound){
        res.write('alert(\"find a DOM command in 3rd party script:'+line.toString().replace(/(")/g,"\'").replace(/(\n)/g," ")+"\");\n");
    }
    else if(line == ";")
    {
      return line;
    }
    else{
        res.write(line+";");
    }
});
  });
    res.end("});");
};

var translate = function(line){
  var res = line;

  var replacer = function(str, p1){
     str = str.replace(p1,"#ADSAFE_"+p1.toUpperCase());
     str = str.replace("getElementById","q");
     return str;
  }
  res = res.toString().replace(/appendChild/g,"append");
  res = res.toString().replace(/createElement/g,"tag");
  res = res.toString().replace("innerHTML","value");
  res = res.toString().replace(/getElementById\(\'(.*)\'\)/g,replacer );
  res = res.toString().replcae(/getElementByTagName/g, "q");

  return res;
}
