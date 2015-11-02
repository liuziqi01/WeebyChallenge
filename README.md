My DMP Project - ziqi
=====
###A Proxy server which parses the response before it reached the client to redirect external requests back to orignal server.
=====
#### on Nov.2 



Here is my github repo: 



I use Node.js as the server and proxy server platform.



To configure proxy, I use http-proxy-node module to sensor and rewrite the response, and harmon/trumpet module to parse the response.



The normal server works on port 9000.
The proxy’s target is on port 9000, and the proxy works on port 8000.


Here is the result:

On port 9000, where proxy doesn't work:

![alt tag](https://raw.github.com/liuziqi01/ziqidmp/master/demo_pic/unsafe.png)

On port 8000, where proxy works:


With proxy works, which changes every element with “src” tag to a new src location of localhost :   localhost/handleUnsafeReq?oriUrl=...
And the normal server has a handler called “hanleUnsafeReq” to send a local image “safe.img”

![alt tag](https://raw.github.com/liuziqi01/ziqidmp/master/demo_pic/safe.png)

code:

The commented out part is also implemented to rewrite any content in any element.

Node: It possible to have multiple rewriting policy configured on the proxy. (For later use)

```javascript

var selects = [];
var simpleselect = {};

simpleselect.query = '[src]';
simpleselect.func = function (node) {
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
node.setAttribute("src", "http://localhost:9000/handleUnsafeReq?oriUrl="+tag.getAttribute("src"));


};
  selects.push(simpleselect);
```
Server and proxy server:

``` javascript
 var proxy = httpProxy.createProxyServer({
          target: 'http://localhost:9000'
        })

        //Additional true parameter can be used to ignore js and css files. 
        //app.use(require('../')([], selects, true));

        proxy_app.use(require('harmon')([], selects));

        proxy_app.use(function (req, res) {
                 proxy.web(req, res);
               });

        http.createServer(proxy_app).listen(8000); //proxy server
       target_app.listen(9000); 
```

The module in the normal server to handle the request:(not fully-function yet)
```javascript
exports.handleUnsafeReq= function(req, res) {
	
    console.log("I should request img from %s",req.query.oriUrl);
 
      var img = fs.readFileSync('./public/img/safe.jpg');
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
}
```

#####The difficulties:



Most of the current proxy works good on parsing the request instead of parsing the server.


Most of the proxy works on rewriting the header part of the response/request, will this function be useful in later stage of the project?




#####Questions:



Now the proxy works on a certain port….Though most of the proxy demo in this way, I’m questionable about whether this is a good practice? 



#####Working on :



1.I’m still working on how to pass the exact original url to the server.(currently, I pass every attribute in the original element, where most of them are useless. 



2.Some src are not dangerous, i.e. local image…, try to distinguish them from others.



3.Try to find a good policy that covers most of the case with dangerous link:


	 src

	data-imgsrc? 

	href?
	
	link (tag)
