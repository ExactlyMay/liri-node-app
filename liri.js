require("dotenv").config();

var Twitter = require('twitter');
 
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

var params = {
    screen_name: 'ExactlyMay',
    // q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
  }


var request = require("request");
var userCommand = process.argv[2];
var userInput = process.argv[3];

 

switch(userCommand){
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        spotify();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        whatItSays();
        break;
    default:

        break;
}


function twitter(){


    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(response);
          let username = params.screen_name;
          let tweetId = response.id_str;
        //   console.log('Tweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
    });
}
function spotify(){

}
function movie(){
    request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
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
    
}



