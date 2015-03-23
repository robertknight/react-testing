import {Store} from 'flummox';

export default class TweetStore extends Store {
	constructor(flux) {
		super();

		this.state = {
			tweets: []
		};

		const feedActionIds = flux.getActionIds('tweets');
		this.register(feedActionIds.fetchTimeline, this.handleTimelineUpdate);
	}

	getTweets() {
		return this.state.tweets;
	}

	handleTimelineUpdate(tweets) {
		this.setState({tweets: tweets});
	}
}

