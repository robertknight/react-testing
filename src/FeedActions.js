import {Actions} from 'flummox';

const TWITTER_PROXY_URL = 'http://localhost:3000/timeline';

export default class FeedActions extends Actions {
	fetchTimeline() {
		return fetch(TWITTER_PROXY_URL).then(res => {
			return res.json();
		}).then(json => {
			return json.map(entry => {
				return {
					id: entry.id,
					user: {
						screenName: entry.user.screen_name,
						description: entry.user.name,
						icon: entry.user.profile_image_url_https
					},
					text: entry.text,
					createdAt: entry.created_at
				}
			});
		}).catch(err => {
			console.error('fetching tweets failed');
		});
	}
}

