//First I add all of the required packages 
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
var request = require("request");

//Next I set up the command line inputs as variables 
var userOperator = process.argv[2];
var userSelector = process.argv[3];

//Then we create a loop to take in multi-word inputs without breaking the app
for (var i = 4; i < process.argv.length; i++) {
    userSelector += '+' + process.argv[i];
}

//Then we log the operator and selector 
console.log(colors.red("The Operator is " + process.argv[2]));
console.log(colors.red("The Selector is " + userSelector));





//First up is the OMDB API stored as a function 
var movieThis = function () {
    //Assign the command line input to a variable to be passed to the query 
    var movieName = userSelector;
    // Build the query url with our new command line variable
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";
//Then we have the actual request 
    request(queryUrl, function (error, response, body) {

        
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
//We are storing the response data in a variable called showData
            var showData = [
            console.log('================ Movie ================'),
            console.log(colors.green("Title: " + body.Title)),
            console.log("Release Year: " + body.Year),
            console.log(colors.green("IMdB Rating: " + body.imdbRating)),
            console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value),
            console.log(colors.green("Country: " + body.Country)),
            console.log("Language: " + body.Language),
            console.log(colors.green("Plot: " + body.Plot)),
            console.log("Actors: " + body.Actors),
            console.log('==================================='),
            ]
//We are then appending this newly defined object to the text file as an audit long 
            fs.appendFile("random.txt", showData, function(err) {
                if (err) throw err;
              });
//Error handeling 
        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //If the user does not input any movie then we make a suggestion on Netflix 
        //Response if user does not type in a movie title
        if (movieName === "") {
            console.log("-----------------------");
            console.log("If you haven't watched Memento, then you need to see it!");
            console.log("It's on Netflix!");
            console.log("-----------------------");
        }
    });
    
}
//Next up is the spotify API  
var spotifyThisSong = function (songName) {
//We are using spotify.search as our query since we installed the spotify package 
    spotify.search(
        {
            type: "track",
            query: userSelector
        },
        //Error handeling
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
//This varibles sets songs equal to the response from spotify 
            var songs = data.tracks.items;
//We then store out responses to be logged within an object so we can push the audit trail to the text file 
            var showData = [
                console.log(i),
                console.log("-----------------------------------"),
                console.log(colors.blue("Artist: " + songs[i].artists[0].name)),
                console.log("Song Name: " + songs[i].name),
                console.log("Preview: " + songs[i].preview_url),
                console.log(colors.blue("Album: " + songs[i].album.name)),
                console.log("-----------------------------------"),
            ]
            //We are then appending this newly defined object to the text file as an audit long 

            // fs.appendFile("random.txt", function(err) {
            //     if (err) throw err;
                
            //   });
            
        }
    );
    
};
//Lastly is the concert API call 
var concertThis = function (artistName) {
    //First we set artist equal to the user input which can be mutil-word 
    var artist = userSelector;
    
    var bandsquery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//Then we query using our newly defined artist variable 
    axios.get(bandsquery)
  .then(function (response) {
      //Then we use axios to call the api 
    var showData = [
    console.log(colors.blue("The venue name is " + response.data[1].venue.name)),
    console.log(colors.blue("THe venue location is " + response.data[1].venue.city + ", " + response.data[1].venue.region)),
    console.log(colors.blue("The date of the concert is " + response.data[1].datetime)),
    //Lastly we store all of the information to be logged to a object so that we can push it to the text file 
].join("\n\n");
//Include 2 new lines for double spacing


//We are then appending this newly defined object to the text file as an audit long 
fs.appendFile("random.txt", showData, function(err) {
    if (err) throw err;
    console.log(showData);
  });
  });
  
}





//This is the conditional logic that chooses what to run based on the userOperator defined in the command line 
var runLiri = function () {
    if (process.argv[2] === "concert-this") {
        concertThis();
        //Concert API

    };
    if (process.argv[2] === "spotify-this-song") {
        //Spotify API
        if (userSelector === undefined){
            userSelector = "The Sign";
            //Default Song
        }
        spotifyThisSong();
    }
    if (process.argv[2] === "movie-this") {
        movieThis();
        //Movie API
    }
    if (process.argv[2] === "undefined"){
        console.log("You have to choose a function")
        console.log("Here are your choices: movie-this, concert-this, or spotify-this-song")
        //Alerts the user that they are stupid 

    }
   
    
};
runLiri();
//Runs the conditional logic which launches the whole application 
