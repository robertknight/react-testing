import cors from 'cors';
import express from 'express';
import fs from 'fs';
import Q from 'q';

import Twitter from 'twit';

const config = JSON.parse(fs.readFileSync('server-config.js'));
const client = new Twitter(config);
const app = express();

let pendingTweets = [];
let sentTweets = [];

function sendTweets(pendingTweets, sentTweets, res) {
	const nextTweet = pendingTweets.shift();
	sentTweets.unshift(nextTweet);

	// send tweets after a delay to simulate latency
	// when fetching updates
	setTimeout(() => {
		res.send(sentTweets);
		res.end();
	}, 500);
}

function fetchTweets() {
	var params = {};
	var result = Q.defer();
	console.log('fetching tweets');
	client.get('statuses/home_timeline', params, (error, tweets, response) => {
		if (error) {
			console.log('fetch failed', error.toString());
			result.reject(error);
		} else {
			console.log(`fetch completed with ${tweets.length} tweets`);
			result.resolve(tweets);
		}
	});
	return result.promise;
}

app.use(cors());
app.get('/timeline', (req, res) => {
	if (pendingTweets.length > 0) {
		console.log(`sent cached tweets. pending ${pendingTweets.length}, sent ${sentTweets.length}`);
		sendTweets(pendingTweets, sentTweets, res);
	} else {
		fetchTweets().then(tweets => {
			var newTweets = tweets.filter(tweet => {
				return pendingTweets.find(pendingTweet => pendingTweet.id_str === tweet.id_str) == null;
			}).reverse();

			newTweets.forEach(tweet => {
				pendingTweets.push(tweet);
			});
			console.log(`fetched ${tweets.length} tweets, ${newTweets.length} were new.`);
			sendTweets(pendingTweets, sentTweets, res);
		}).catch(err => {
			console.error(`fetching tweets failed: ${err}`);
			res.status(500);
			res.send(`fetching timeline failed: ${error.toString()}`);
		});
	}
});

let server = app.listen(3000, () => {
	console.log('Twitter proxy listening');
});

