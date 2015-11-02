My DMP Project - ziqi

A Proxy server which parses the response before it reached the client to redirect external requests back to orignal server.
====
Update on Nov.2 
Here is my github repo: 

I use Node.js as the server and proxy server platform.
To configure proxy, I used http-proxy-node module to sensor and rewrite the response, and harmon/trumpet module to parse the response.
The normal server works on port 9000.
The proxy’s target is on port 9000, and the proxy works on port 8000.


