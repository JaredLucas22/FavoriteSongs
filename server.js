var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/listSongs', function (req, res) {
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })
 
 var song = {
    "newsong" : {
       "Song_Name" : "Michael Jackson The Way You Make Me Feel",
       "Artist": "Michael Jackson",
       "Genre": "Pop Music",
       "Song_YTURL" : "https://www.youtube.com/watch?v=HzZ_urpj4As"
    }
 }
 


 app.delete('/deleteSong', function (req, res) {
    fs.readFile(__dirname + "/songs.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        const id = req.params.id;
        if (data["song" + 2]) {
            delete data["song" + 2];
            console.log(data);
            res.end(JSON.stringify(data));
        }
    });
});

app.post('/addSong', function (req, res) {
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["new_song"] = song["newsong"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

 app.get('/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "songs.json", 'utf8', function (err, data) {
       var songs = JSON.parse( data );
       var song = songs["song" + req.params.id] 
       console.log( song );
       res.end( JSON.stringify(song));
    });
 })
 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })