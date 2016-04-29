/*
  adPolicy : the policies define t which part of HTML is okay to be accessed and modified by 3rd party script
  proxyHHost : the domain name of your proxy
*/
var adPolicies = [".ad1"];
var wrapperId= "ADSAFE_";
var proxyHost="http://localhost:9000";
var jsString = "<div id= \'" + wrapperId + "\'><script> ADSAFE.id(' "+wrapperId+" ');</script>";

var selects = [];
var changeId = {};
changeId.query = '[id]';
changeId.func = function(node){
  var old_id = node.getAttribute('id');
  //The adPolicy refers to an id
  for (var adPolicy : adPolicies ){
  if(adPolicy.charAt(0) == '#' && old_id == adPolicy.substring(1) ){
    node.setAttribute('id',wrapperId+node.getAttribute('id').toUpperCase());

  var read = node.createReadStream({'outer':true});
  var write = node.createWriteStream({'outer':true});
  write.on('end',function(data){
    write.write("</div>");
  });
  write.write("<div id= 'ADSAFE_'><script>ADSAFE.id('ADSAFE_');</script>");
  
  read.pipe(write);
  }
}
};

changeClass.query = '[class]';
changeClass.func = function(node){
  var old_tagName = node.getAttribute('class');
  //The adPolicy refers to an id
  for (var adPolicy : adPolicies ){
  if(adPolicy.charAt(0) == '.' && old_id == adPolicy.substring(1) ){
    var read = node.createReadStream({'outer':true}); 
    var write = node.createWriteStream({'outer':true});
    write.on('end',function(data){
      write.write("</div>");
    });
   write.write("<div id= 'ADSAFE_'><script>ADSAFE.id('ADSAFE_');</script>");
  
   read.pipe(write);
  }
}
};


/*
  read.on('data',function(data){
    innerhtml = innerhtml+ data.toString();

  });
  read.on('end',function(data){
    console.log(innerhtml);
    var writeStream = node.createWriteStream({'outer':true});
    writeStream.on('end',function(){
      writeStream.end("<div id='ADSAFE_'>"+innerhtml+"</div>");
    });
    
  });

*/
/*
  var loudHTMLDStream = node.createStream('.loud');
loudHTMLDStream.on('data', 
function(data) {
loudHTMLDStream.write("<div id= 'ADSAFE_'>" + data.toString() + "</div>");
});
loudHTMLDStream.on('end', 
function(data) {
loudHTMLDStream.end();
});
*/
 // 
  //read.pipe(cloneNode);
  //console.log(read);
  //writeStream.end("<div id = 'ADSAFE_'>" + node.innerHTML + "</div>");
  //node.createWriteStream({'outer':true}).end(jsString+"</div>");
  //node.parentNode.appendChild(wrapperDiv);
  //node.parentNode.removeChild(node);


var redirScript ={};
redirScript.query='script[src]';
redirScript.func = function(node){
    var sourcePath = node.getAttribute('src');
    if(sourcePath.substring(0,4)=="http"){ // external source somehow
        node.setAttribute('src', proxyHost+"/handleUnsafeScript?oriUrl="+sourcePath);
    }
}
selects.push(redirScript);
selects.push(changeId);




module.exports = function(proxy_app) {
	proxy_app.use("/",require('harmon')([], selects));
}
                                                                                                                                       