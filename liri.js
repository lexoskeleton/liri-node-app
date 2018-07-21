require("dotenv").config();
//variables for specific npm packages + keys folder
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");


//Spotify functionalities
var spotify = new Spotify(keys.spotify);

var getArtistName = function(artist) {
    return artist.name;
}

var getSongName = function(songName) {
    var songName = process.argv[3];
    //user validation to prevent user from passing in nonsense 
    if (songName === undefined) {
        songName = "Torn Apart";
    }
    console.log(songName);
   
    spotify.search( {

       type: "track", 
       query: songName,

        },

        function(err, data){
          if (err) {
              console.log("Error occured" + err);
              return;
          }  

        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Artists: " + songs[i].artists.map(getArtistName));
            console.log("Song Name: " + songs[i].name);
            console.log("Preview Song: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("-----------------------------------");
        }

    }
        
    )
};


//Twitter
var getMyTweets = function () {
    var client = new Twitter(keys.twitter);

    var params = {
        screenNAme: "lexi_class_jawn"

    };
    client.get("statuses/user_timeline", params, function(err, tweets, response){
        if (!err) {
            for (var i =0; i < tweets.length; i++) {
                console.log(tweets[i].create_at);
                console.log("");
                console.log(tweets[i].text);
                console.log("-----------------------------------");
            }
        }
    });

};

//OMDB
var getMeMovie = function(movieName) {
    var movieName = process.argv[3];
    if (movieName === undefined) {
      movieName = "Mr Nobody";
    }
  
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
  
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log("-----------------------------------");
      }
    });
  };

  //do what it says

  var doWhatItSays = function(){
      fs.readFile("random.txt", "utf8", function(err, data){
          console.log(data);
          if (err) {
              console.log(error);
          }
          var dataArr = data.split(",");
          if (dataArr.length === 2) {
              pick(dataArr[0], dataArr[1]);
          }
          else if (dataArr.length === 1) {
              pick(dataArr[0]);
              console.log(dataArr[0]);
            
          }
      }
    )};

    var pick = function(caseData, functionData){
        switch (caseData) {
            case "myTweets":
            getMyTweets();
            break;
            case "spotify-this-song":
            getSongName();
            break;
            case "movie-this":
            getMeMovie();
            break;
            case "do-what-it-says":
            doWhatItSays();
            break;
            default: 
            console.log("LIRI, I don't know!");
        }
        

    };
    //this function passes in the cases/functions (argOne) and command line input (argTwo)
    var runThisTown = function(argOne, argTwo) {
        pick(argOne, argTwo);
    };

    runThisTown(process.argv[2], process.argv[3]);

