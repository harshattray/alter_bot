
var Twit = require('twit');

var config = require('./config');
var stalk = new Twit(config);

//Get tweets based on specific search queries in a specified time duration
var params = {
    // q = 'string' to be searched
    q: 'twitter since:2011-07-11',
    count: 2
}

var getData = stalk.get('search/tweets', params, getTweets);

function getTweets(err, data, response) {
};
 // usng stream to watch specific  events , in this case follow
var stream_stalk = stalk.stream('user');
stream_stalk.on('follow',follow);

function follow(msg){
    var name = msg.source.name;
    var screenName = msg.source.screen_name;
    tweetResp('@'+screenName+''+ '  Thumbsup');
}

//Using Stream to track @mention events
var stream_watch = stalk.stream('user')

stream_watch.on('tweet',trigger)
function trigger(eventMsg){
    var fs = require('fs');
    var json = JSON.stringify(eventMsg,null,2);
    fs.writeFile("stream_data.json",json);
    var reply_to = eventMsg.in_reply_to_screen_name;
    var content_from = eventMsg.user.screen_name;
    var content = eventMsg.text;
    if(reply_to === 'Your handle comes here'){ //<= Your handle comes here
        var new_reply = '@'+ content_from + ' deal with it & shut up';
        tweetResp(new_reply);
    }
    else{
        fs.writeFile("error.txt",log);
    }
}
//POST updates
function tweetResp(txt){
    var tweet_up = {
        status : txt
    }
    var postTweets = stalk.post('statuses/update', tweet_up, sendTweets);
    function sendTweets(err, data, response) {
    };

}
//wait for it
setInterval(tweetResp, 1000*60);
