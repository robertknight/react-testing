// this is a trivial proxy of the Twitter API for use in testing,
// as the real API has a very low rate limit.
//
// It reads API keys from a 'server-config.js' config file, fetches
// the user's current timeline when a call to /timeline is made and
// then returns a timeline consisting of the oldest tweet.
//
// Each successive call to /timeline returns the timeline with one
// newer entry, until the cache is exhausted at which point it refetches
// from the real API

import assert from 'assert';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import Q from 'q';

import Twitter from 'twit';

const CACHE_FILE = 'tweet-cache.js';

function readCache() {
	try {
		const cachedTweets = JSON.parse(fs.readFileSync(CACHE_FILE).toString());
		console.log(`read ${cachedTweets.length} Tweets from ${CACHE_FILE}`);
		return cachedTweets;
	} catch (ex) {
		console.warn(`Unable to read tweet cache. Starting afresh`);
		return [];
	}
}

function writeCache(tweets) {
	fs.writeFileSync('tweet-cache.js', JSON.stringify(tweets, null, 2));
}

function sendTweets(pendingTweets, sentTweets, res) {
	assert(pendingTweets.length > 0);

	let minSentTweets = Math.max(sentTweets.length + 1, 5);
	while (sentTweets.length < minSentTweets && pendingTweets.length > 0) {
		const nextTweet = pendingTweets.shift();
		sentTweets.unshift(nextTweet);
	}

	// send tweets after a delay to simulate latency
	// when fetching updates
	setTimeout(() => {
		res.send(sentTweets);
		res.end();
	}, 300);
}

function fetchTweets() {
	var params = {};
	var result = Q.defer();
	client.get('statuses/home_timeline', params, (error, tweets, response) => {
		if (error) {
			console.error('failed to fetch Tweets from Twitter API:', error.toString());
			result.reject(error);
		} else {
			console.error(`fetched ${tweets.length} Tweets from Twitter API`);
			result.resolve(tweets);
		}
	});
	return result.promise;
}

const config = JSON.parse(fs.readFileSync('server-config.js'));
const client = new Twitter(config);
const app = express();

let pendingTweets = readCache();
let sentTweets = [];

app.use(cors());
app.get('/timeline', (req, res) => {
	if (pendingTweets.length > 0) {
		sendTweets(pendingTweets, sentTweets, res);
	} else {
		fetchTweets().then(tweets => {
			var seenTweetIds = pendingTweets.concat(sentTweets).map(tweet => tweet.id_str);
			var newTweets = tweets.filter(tweet => {
				return seenTweetIds.indexOf(tweet.id_str) === -1;
			}).reverse();

			newTweets.forEach(tweet => {
				pendingTweets.push(tweet);
			});
			console.log(`fetched ${tweets.length} tweets, ${newTweets.length} were new.`);
			if (pendingTweets.length > 0) {
				sendTweets(pendingTweets, sentTweets, res);
				writeCache(sentTweets.concat(pendingTweets));
			}
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

