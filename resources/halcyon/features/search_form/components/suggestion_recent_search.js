import React from 'react';
import PropTypes from 'prop-types';

export default class SuggestionRecentSearch extends React.PureComponent {

  static propTypes = {
    recentSearch: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  }

  handleClick = e => {
    e.preventDefault();
    this.props.onClick();
  }

  render () {
    const { recentSearch } = this.props;

    return (
      <li className='suggestion-recent-search search-form-suggestion-item'>
        <a href={`/search/hashtag/${recentSearch}`} onClick={this.handleClick}>
          { recentSearch }
        </a>
      </li>
    );
  }

}
