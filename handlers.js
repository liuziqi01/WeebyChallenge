
fs = require('fs');
url = require('url');

exports.index = function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><head></head><body><div class="a">Nodejitsu Http Proxy</div><div class="b">&amp; Frames</div><img id=\'here\' src=\'http://www.hit-counts.com/wp-content/uploads/2015/10/google-adwords.jpg\'/></body></html>');
  res.end();
}

exports.handleUnsafeScript= function(req, res) {

  res.end("Hello World");
	/*
	var video_id = req.query.v;
	res.render('watch', { id: video_id }, function(err, html) {
		res.send(html);
	})
*/
/*
	var img = fs.readFileSync('');
     res.writeHead(200, {'Content-Type': 'image/jpg' });
     res.end(img, 'binary');
     
    console.log("I should request img from %s",req.query.oriUrl);

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
     res.end(img, 'binary');
 }
 */
}
exports.focus = function(req ,res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('This is a normal handler\n');
}

exports.unsafe = function(req, res) 
{

 res.render('unsafe.html');
  
}
exports.proxy_testing = function(req, res){
 //   res.writeHead(200, { 'Content-Type': 'text/html' });
  //res.write('<html><head></head><body><div class="a">Nodejitsu Http Proxy</div><div class="b">&amp; Frames</div><img id=\'here\'src=\'http://www.hit-counts.com/wp-content/uploads/2015/10/google-adwords.jpg\'/></body></html>');
 // res.end();
    res.render('proxy_testing.html');
}

exports.test = function(req, res) 
{

  res.render('test.html');
  
}




