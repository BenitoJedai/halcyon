import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ImmutablePureComponent from 'react-immutable-pure-component';

// This component will be rendered in out of the "main" Switch so
// Pure NavLink is unavailable
export default class SearchNavigation extends ImmutablePureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render () {
    const id = 'foobar';

    return (
      <div className='search-navigation'>
        <ul className='search-navigation__list'>

          <li className='search-navigation__list-item'>
            <NavLink exact to={`/search/hashtag/${id}`} location={location} className='search-navigation__link' activeClassName='search-navigation__link--current'>
              <div className='search-navigation__label'>
                <FormattedMessage id='search.hashtag' defaultMessage='Hashtag' />
              </div>
            </NavLink>
          </li>

          <li className='search-navigation__list-item'>
            <NavLink exact to={`/search/accounts/${id}`} location={location} className='search-navigation__link' activeClassName='search-navigation__link--current'>
              <div className='search-navigation__label'>
                <FormattedMessage id='search.accounts' defaultMessage='People' />
              </div>
            </NavLink>
          </li>

        </ul>
      </div>
    );
  }

}
