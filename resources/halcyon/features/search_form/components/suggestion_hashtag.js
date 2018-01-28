import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SuggestionHashtag extends React.PureComponent {

  static propTypes = {
    hashtag: PropTypes.string,
  }

  render () {
    const { hashtag } = this.props;

    return (
      <li className='suggestion-hashtag search-form-suggestion-item'>
        <Link to={`/timelines/tag/${hashtag}`}>
          #{ hashtag }
        </Link>
      </li>
    );
  }

}
