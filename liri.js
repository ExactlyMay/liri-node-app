require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {
    screen_name: 'ExactlyMay',
    count: 21,
    result_type: 'recent',
    lang: 'en'
  }

  var command = process.argv[2];
  var input = "";
  
  for (var i = 3; i < process.argv.length; i++){
    input += (process.argv[i] + " ");
  }

switch(command){
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        printMovie();
        break;
    case "do-what-it-says":
        whatItSays();
        break;
    default:
        console.log("Liri doesn't know that, sorry! >_<");
        break;
}


function myTweets(){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            return console.log('Error Occurred: ' + error);
          }
        let username = params.screen_name;
        console.log("Twitter Username: " + username);
        for(var i = 0; i < 20; i++){
            console.log("# " + (i + 1) + ": " + JSON.parse(response.body)[i].text);
        }
    });
}
function spotifySong(){
    if(!input){
        input = "The Sign by Ace of Base";
    }

    spotify.search({ type: 'track', query: input, limit: 1 }, function(error, data) {
        if (error) {
            return console.log('Error Occurred: ' + error);
        }
        console.log("Song's Name: " + data.tracks.items[0].name); 
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name); 
        console.log("Spotify Link Preview: " + data.tracks.items[0].preview_url); 
        console.log("Song's Name: " + data.tracks.items[0].album.name); 
    });
}

function printMovie(){
    if(!input){
        input = "Mr. Nobody";
    } 

    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else if (response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Ratings[1].Source + " Rating: "+ JSON.parse(body).Ratings[1].Value); 
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}
function whatItSays(){
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log('Error Occurred: ' + error);
          }
        command = data.split(",")[0];
        input = data.split(",")[1];

        switch(command){
            case "my-tweets":
                myTweets();
                break;
            case "spotify-this-song":
                spotifySong();
                break;
            case "movie-this":
                printMovie();
                break;
            default:
                console.log("Woops, Liri doesn't know that, sorry! >_<");
                break;
        }
    });    
}