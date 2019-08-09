require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
const axios = require('axios');
var fs = require("fs");
var moment = require('moment');


const colors = require('colors');


console.log(keys);

var request = require("request");

fs.appendFileSync("random.txt", "Starting Here");



moment().format();

// var SPOTIFY_ID = "0fe7fd97619c4e14a9a07efc57353c7f";
// var SPOTIFY_SECRET = "34939e78c9df41e1a711e9df0535d28c";

var userOperator = process.argv[2];
var userSelector = process.argv[3];


console.log(colors.red("The Operator is " + process.argv[2]));
console.log(colors.red("The Selector is " + process.argv[3]));






var movieThis = function () {
    //Assign the command line input to a variable to be passed to the query 
    var movieName = process.argv[3];
    // Build the query url with our new command line variable
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

var concertThis = function (artistName) {
    var artist = process.argv[3];
    
    var bandsquery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandsquery)
  .then(function (response) {
    console.log(colors.blue("The venue name is " + response.data[1].venue.name));
    console.log(colors.blue("THe venue location is " + response.data[1].venue.city + ", " + response.data[1].venue.region));
    console.log(colors.blue("The date of the concert is " + response.data[1].datetime));
  })
}



//This is the conditional logic that chooses what to run based on the userOperator defined in the command line 
var runLiri = function () {
    if (process.argv[2] === "concert-this") {
        concertThis();
    };
    if (process.argv[2] === "spotify-this-song") {
        spotifyThisSong();
    }
    if (process.argv[2] === "movie-this") {
        movieThis();
    }
    if (process.argv[2] === "undefined"){
        console.log("You have to choose a function")
        console.log("Here are your choices: movie-this, concert-this, or spotify-this-song")
    }
};
runLiri();



// var term = process.argv.slice[3].join(" ");
// console.log(term);