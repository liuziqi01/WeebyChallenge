
fs = require('fs');
url = require('url');

exports.index = function(req, res) {
	res.render('ziqi.html');
}

exports.handleUnsafeReq= function(req, res) {
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
     */
    console.log("I should request img from %s",req.query.oriUrl);
     //res.sendFile('../Images/safeImg.jpg');
     /*
     res.writeHead(200, {"Content-Type": "text/html"});
     res.end('<html><div><img src = \'./Images/safeImg.jpg\' width = \"43" ></div></html>')
     //res.end('<div><img src = \'../Images/safeImg.jpg\' width = \"43" ></div>');
     
     */
      var img = fs.readFileSync('./public/img/safe.jpg');
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
}


exports.unsafe = function(req, res) 
{

 res.render('unsafe.html');
  
}

exports.test = function(req, res) 
{

  res.render('test.html');
  
}




