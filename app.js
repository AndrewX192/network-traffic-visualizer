var express = require('express');
var app     = express();
var fs      = require('fs');
var neo4j   = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');

app.get('/index.html', function(req, res){
  fs.readFile('index.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});


app.get('/visualization.json', function(req, res) {
  db.query("START source=node(1,3,5,7,9,11) "
           + "MATCH source-[]->destination "
           + "RETURN source.mac, destination.mac", function(err, results) {
    if (err) {
      console.log("e: " + err);
    }

    //res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(results));

    console.log(JSON.stringify(results));
  });
  
});
app.listen(3000);
console.log('Listening on port 3000');
