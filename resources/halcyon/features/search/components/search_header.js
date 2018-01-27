import React from 'react';
import PropTypes from 'prop-types';

import SearchKeyword from './search_keyword';
import SearchNavigation from './search_navigation';

export default class SearchHeader extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render () {
    const { location } = this.props;

    return (
      <header className='search-header'>
        <SearchKeyword id='これはテストの文字列です' />

        <div className='search-header__banner'>
          <div className='search-header__banner-inner'>
            <SearchNavigation location={location} />
            <div className='search-header-dropdown' />
          </div>
        </div>
      </header>
    );
  }

}
