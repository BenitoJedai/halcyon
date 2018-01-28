import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { defineMessages } from 'react-intl';
import { DropdownMenu } from '../../../components/dropdown_menu';
import Avatar from '../../../containers/avatar_container';

const messages = defineMessages({
  profile: { id: 'user_navigation.profile', defaultMessage: 'Profile' },
  list: { id: 'user_navigation.list', defaultMessage: 'Lists' },
  settings: { id: 'user_navigation.settings', defaultMessage: 'Settings' },
  keyboardShortcuts: { id: 'user_navigation.keyboard_shortcuts', defaultMessage: 'Keyboard shortcuts' },
  logout: { id: 'user_navigation.logout', defaultMessage: 'Log out' },
});


export default class UserDropdown extends ImmutablePureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    account: ImmutablePropTypes.map,
    intl: PropTypes.object.isRequired,
    isUserTouching: PropTypes.func,
    isModalOpen: PropTypes.bool.isRequired,
    onModalOpen: PropTypes.func,
    onModalClose: PropTypes.func,
  }

  static defaultProps = {
    direction: 'left',
    placement: 'bottom',
  }

  state = {
    expanded: false,
  }

  handleClick = () => {
    if (!this.state.expanded && this.props.isUserTouching() && this.props.onModalOpen) {
      const { status, items } = this.props;

      this.props.onModalOpen({
        status,
        actions: items,
        onClick: this.handleItemClick,
      });

      return;
    }

    this.setState({ expanded: !this.state.expanded });
  }

  handleClose = () => {
    if (this.props.onModalClose) {
      this.props.onModalClose();
    }

    this.setState({ expanded: false });
  }

  handleKeyDown = e => {
    switch(e.key) {
    case 'Enter':
      this.handleClick();
      break;
    case 'Escape':
      this.handleClose();
      break;
    }
  }

  handleItemClick = e => {
    const i = Number(e.currentTarget.getAttribute('data-index'));
    const { action, to } = this.props.items[i];

    this.handleClose();

    if (typeof action === 'function') {
      e.preventDefault();
      action();
    } else if (to) {
      e.preventDefault();
      this.context.router.history.push(to);
    }
  }

  setTargetRef = c => {
    this.target = c;
  }

  findTarget = () => {
    return this.target;
  }

  render() {
    const { intl, account, onModalOpen } = this.props;
    const { expanded } = this.state;

    if ( account === null ) {
      return null;
    }

    const id              = account.get('id');
    const acct            = account.get('full_username');
    const displayNameHtml = { __html: account.get('display_name_html') };

    const items = [
      {
        text: (
          <div>
            <h3 className='user-dropdown-menu__display-name' dangerouslySetInnerHTML={displayNameHtml} />
            <span className='user-dropdown-menu__username'>{ acct }</span>
          </div>
        ),
        to: `/accounts/${id}`,
      },
      null,
      {
        text: intl.formatMessage(messages.profile),
        to: `/accounts/${id}`,
      },
      {
        text: intl.formatMessage(messages.list),
        to: '/lists',
      },
      null,
      {
        text: intl.formatMessage(messages.settings),
        action: () => onModalOpen('SETTINGS', {}),
      },
      {
        text: intl.formatMessage(messages.keyboardShortcuts),
        action: () => onModalOpen('KEYBOARD_SHORTCUTS', {}),
      },
      {
        text: intl.formatMessage(messages.logout),
        to: '/logout',
      },
    ];

    return (
      <div className='user-dropdown-menu'>
        <button ref={this.setTargetRef} onClick={this.handleClick}>
          <Avatar account={account} size={32} />
        </button>

        <Overlay show={expanded} placement='bottom' target={this.findTarget}>
          <DropdownMenu
            items={items}
            placement='bottom'
            direction='right'
            onClose={this.handleClose}
          />
        </Overlay>
      </div>
    );
  }

}
