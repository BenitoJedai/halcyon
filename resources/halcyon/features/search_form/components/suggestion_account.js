import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Link } from 'react-router-dom';

import Avatar from '../../../containers/avatar_container';
import DisplayName from '../../../components/display_name';
import Username from '../../../containers/username_container';

export default class SuggestionAccount extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
  }

  render () {
    const { account } = this.props;

    if (!account) {
      return null;
    }

    return (
      <li className='suggestion-account search-form-suggestion-item'>
        <Link to={`/accounts/${account.get('id')}`}>
          <Avatar account={account} size={32} />

          <div className='suggestion-account__name'>
            <DisplayName account={account} />
            <Username account={account} />
          </div>
        </Link>
      </li>
    );
  }

}
