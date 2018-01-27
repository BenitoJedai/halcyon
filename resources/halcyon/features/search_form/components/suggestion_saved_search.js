import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SuggestionSavedSearch extends React.PureComponent {

  static propTypes = {
    savedSearch: PropTypes.string,
  }

  render () {
    const { savedSearch } = this.props;

    return (
      <li className='suggestion-saved-search search-form-suggestion-item'>
        <Link to={`/search/hashtag/${savedSearch}`}>
          #{ savedSearch }
        </Link>
      </li>
    );
  }

}
