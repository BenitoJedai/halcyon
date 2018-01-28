import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage, defineMessages } from 'react-intl';

import ProfileCard from '../../../containers/profile_card_container';

const messages = defineMessages({
  not_supported: { id: 'not_supported.generic', defaultMessage: 'This feature is not supported in your browser' },
});

export default class AccountsSettings extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    account: ImmutablePropTypes.map.isRequired,
    onShowMessage: PropTypes.func.isRequired,
  }

  handleProtocolHandlerEnable = e => {
    e.preventDefault();

    if (typeof navigator.registerProtocolHandler !== 'undefined') {
      const handlerUrl = window.location.protocol + '//' + window.location.host + '/intent?uri=%s';
      navigator.registerProtocolHandler('web+mastodon', handlerUrl, 'Halcyon');
    } else {
      this.props.onShowMessage({ message: this.props.intl.formatMessage(messages.not_supported), interval: 10000 });
    }
  }

  render () {
    const { account } = this.props;

    return(
      <div className='settings__content'>
        <h3><FormattedMessage id='settings.accounts' defaultMessage='Accounts' /></h3>

        <form className='account-setting-form'>
          <div>
            <ProfileCard accountId={account.get('id')} />
          </div>

          <div>
            <button className='round-button' onClick={this.handleProtocolHandlerEnable}>
              web+mastodon
            </button>
          </div>
        </form>
      </div>
    );
  }

}
