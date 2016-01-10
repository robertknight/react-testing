import classNames from 'classnames';
import React, {Component} from 'react';

function relativeDate(input) {
  const ageMs = Date.now() - input;
  const ageMinutes = Math.floor(ageMs / 1000.0 / 60.0);
  const ageHours = Math.floor(ageMinutes / 60.0);

  if (ageMinutes < 1.0) {
    return 'seconds ago';
  } else if (ageHours < 1.0) {
    return `${ageMinutes}m`;
  } else if (ageHours < 24.0) {
    return `${ageHours}h`;
  } else {
    return input.toLocaleDateString();
  }
}

export default class TweetItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tweet = this.props.tweet;
    const dateString = relativeDate(new Date(Date.parse(tweet.createdAt)));

    return <div className={classNames({
      'tweet-item': true,
      'tweet-item-selected': this.props.isSelected
    })}
      ref="container"
      onClick={this.props.onClick}
    >
      <div>
        <img className='tweet-item-user-icon' ref="userIcon" src={tweet.user.icon}/>
      </div>
      <div className='tweet-item-details'>
        <span className='tweet-item-user-description' ref="userDescription">{tweet.user.description}</span>
        <span className='tweet-item-user-screen-name' ref="userScreenName">@{tweet.user.screenName}</span>
        <span className='tweet-item-date' ref="date"> - {dateString}</span>
        <div className='tweet-item-text' ref="text">{tweet.text}</div>
      </div>
    </div>;
  }
}
