require("dotenv").config();

// var spotify = new Spotify(keys.spotify);

var keys = require("./keys");

const axios = require('axios');

var Spotify = require('node-spotify-api');

var fs = require("fs");
var request = require("request");



var moment = require('moment');
moment().format();

var userOperator = process.argv[2];
var userSelector = process.argv[3];


console.log("The Operator is " + process.argv[2]);
console.log("The Selector is " + process.argv[3]);





var movieThis = function() {
    //Assign the movie name as the selector from the command line
    var movieName = process.argv[3];
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //Simultaneously output to console and log.txt via NPM simple-node-logger
            console.log('================ Movie ================');
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log('===================================');

        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        if (movieName === "") {
            console.log("-----------------------");
            console.log("If you haven't watched Memento, then you need to see it!");
            console.log("It's on Netflix!");
            console.log("-----------------------");
        }
    });
}

var spotifyThisSong = function (songName) {

    spotify.search(
        {
            type: "track",
            query: userSelector,
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

var concertThis = function (artistName){
    var artist = process.argv[3];
    var bandsquery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
}
    
    

//This is the conditional logic that chooses what to run based on the userOperator defined in the command line 
if (process.argv[2] === "concert-this"){
    concertThis();
};

if (process.argv[2] === "spotify-this-song"){
    spotifyThisSong();
}

if (process.argv[2] === "movie-this"){
movieThis();
}