import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import classNames from 'classnames';
import { autoPlayGif } from '../initial_state';
import replaceLink from '../replace_link';

import Avatar from '../containers/avatar_container';
import DispalyName from '../components/display_name';
import Username from '../containers/username_container';

class ProfileCardCounters extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
  }

  render() {
    const { account } = this.props;

    const id = account.get('id');
    const followers_count = account.get('followers_count');
    const following_count = account.get('following_count');
    const statuses_count  = account.get('statuses_count');

    return (
      <div className='profile-card-counters'>
        <ul className='profile-card-counters__list'>
          <li className='profile-card-counters__list-item'>
            <Link to={`/accounts/${id}`}>
              <span className='profile-card-counters__item-label'>
                <FormattedMessage id='account.toots' defaultMessage='Toots' />
              </span>

              <span className='profile-card-counters__item-count'>
                <FormattedNumber value={followers_count} />
              </span>
            </Link>
          </li>

          <li className='profile-card-counters__list-item'>
            <Link to={`/accounts/${id}/following`}>
              <span className='profile-card-counters__item-label'>
                <FormattedMessage id='account.following' defaultMessage='Following' />
              </span>

              <span className='profile-card-counters__item-count'>
                <FormattedNumber value={following_count} />
              </span>
            </Link>
          </li>

          <li className='profile-card-counters__list-item'>
            <Link to={`/accounts/${id}/followers`}>
              <span className='profile-card-counters__item-label'>
                <FormattedMessage id='account.followers' defaultMessage='Followers' />
              </span>

              <span className='profile-card-counters__item-count'>
                <FormattedNumber value={statuses_count} />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

}

class ProfileCardRelationship extends ImmutablePureComponent {

  render () {
    return <div />;
  }

}

export default class ProfileCard extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
    withNote: PropTypes.bool,
    withCounters: PropTypes.bool,
    withRelationship: PropTypes.bool,
  }

  static defaultProps = {
    withNote: false,
    withCounters: false,
    withFollowButton: false,
    withRelationship: false,
  }

  render() {
    const { account, withNote, withCounters, withFollowButton, withRelationship } = this.props;

    if (account === null) {
      return <div />;
    }

    const header   = autoPlayGif ? account.get('header') : account.get('header_static');
    const id       = account.get('id');
    const noteHtml = { __html: replaceLink(account.get('note_emojified')) };

    return (
      <div className={classNames('profile-card', { 'profile-card--with-follow-button' : withFollowButton })}>
        <div className='profile-card-header' style={{ backgroundImage: `url(${header})` }} />

        <div className='profile-card-account'>
          <Link to={`/accounts/${id}`} className='profile-card-account__link'>
            <div className='profile-card-account__avatar'>
              <Avatar account={account} size={80} />
            </div>

            <div className='profile-card-account__meta'>
              <DispalyName account={account} />
              <Username account={account} />
            </div>
          </Link>

          { withNote ? <div className='profile-card__note' dangerouslySetInnerHTML={noteHtml} /> : <div /> }
          { withCounters ? <ProfileCardCounters account={account} /> : <div /> }
          { withRelationship ?  <ProfileCardRelationship account={account} /> : <div /> }
        </div>
      </div>
    );
  }

}
