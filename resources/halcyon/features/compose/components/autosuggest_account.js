import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

import Avatar from '../../../containers/avatar_container';
import DisplayName from '../../../components/display_name';
import Username from '../../../containers/username_container';

export default class AutosuggestAccount extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
  };

  render () {
    const { account } = this.props;

    return (
      <div className='autosuggest-account'>
        <div className='autosuggest-account-icon'>
          <Avatar account={account} size={32} />
        </div>

        <span className='autosuggest-account-name'>
          <DisplayName account={account} />
          <Username account={account} />
        </span>
      </div>
    );
  }

}
