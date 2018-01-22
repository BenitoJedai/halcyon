import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

// This component will be rendered in out of the "main" Switch so
// Pure NavLink is unavailable
export default class AccountNavigation extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
    location: PropTypes.object.isRequired,
  }

  render () {
    const { account  } = this.props;

    if ( account === null ) {
      return <div />;
    }

    const id = account.get('id');

    return (
      <div className='account-navigation'>
        <ul className='account-navigation__list'>

          <li className='account-navigation__list-item'>
            <NavLink exact to={`/accounts/${id}`} location={location} className='account-navigation__link' activeClassName='account-navigation__link--current'>
              <div className='account-navigation__label'>
                <FormattedMessage id='account.toots' defaultMessage='Toots' />
              </div>

              <div className='account-navigation__counter'>
                <FormattedNumber value={account.get('statuses_count')} />
              </div>
            </NavLink>
          </li>

          <li className='account-navigation__list-item'>
            <NavLink exact to={`/accounts/${id}/following`} location={location} className='account-navigation__link' activeClassName='account-navigation__link--current'>
              <div className='account-navigation__label'>
                <FormattedMessage id='account.following' defaultMessage='Following' />
              </div>

              <div className='account-navigation__counter'>
                <FormattedNumber value={account.get('following_count')} />
              </div>
            </NavLink>
          </li>

          <li className='account-navigation__list-item'>
            <NavLink exact to={`/accounts/${id}/followers`} location={location} className='account-navigation__link' activeClassName='account-navigation__link--current'>
              <div className='account-navigation__label'>
                <FormattedMessage id='account.followers' defaultMessage='Followers' />
              </div>

              <div className='account-navigation__counter'>
                <FormattedNumber value={account.get('followers_count')} />
              </div>
            </NavLink>
          </li>

        </ul>
      </div>
    );
  }

}
