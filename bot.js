
var Twit = require('twit');

var config = require('./config');
var stalk = new Twit(config);

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
    tweetResp('@'+screenName+''+ '  ');
}

function tweetResp(txt){
    var tweet_up = {
        status : txt
    }

    var postTweets = stalk.post('statuses/update', tweet_up, sendTweets);
    function sendTweets(err, data, response) {
    };

}
setInterval(tweetResp, 1000*60);
