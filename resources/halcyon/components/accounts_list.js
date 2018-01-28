import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

import ProfileCard from '../containers/profile_card_container';

export default class AccountsList extends ImmutablePureComponent {

  static propTypes = {
    accountIds: ImmutablePropTypes.list,
  }

  render () {
    const { accountIds } = this.props;

    return (
      <div className='accounts-list'>
        { accountIds.map(accountId => (
          <ProfileCard
            accountId={accountId}
            key={accountId}
            withNote
            withFollowButton
          />
        ))}
      </div>
    );
  }

}
