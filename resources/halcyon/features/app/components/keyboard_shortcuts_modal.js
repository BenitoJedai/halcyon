import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from 'react-intl';
import ModalHeader from './modal_header';

const messages = defineMessages({
  actions: { id: 'keyboard_shortcuts.actions', defaultMessage: 'Actions' },
  navigation: { id: 'keyboard_shortcuts.navigation', defaultMessage: 'Navigation' },
  timelines: { id: 'keyboard_shortcuts.timelines', defaultMessage: 'Timelines' },
  reply: { id: 'keyboard_shortcuts.reply', defaultMessage: 'to reply' },
  mention: { id: 'keyboard_shortcuts.mention', defaultMessage: 'to mention' },
  favourite: { id: 'keyboard_shortcuts.favourite', defaultMessage: 'to favourite' },
  boost: { id: 'keyboard_shortcuts.boost', defaultMessage: 'to boost' },
  compose : { id: 'keyboard_shortcuts.compose', defaultMessage: 'to compose new toot' },
  submit: { id: 'keyboard_shortcuts.submit', defaultMessage: 'to submit toot' },
  up: { id: 'keyboard_shortcuts.up', defaultMessage: 'to move up in the list' },
  down: { id: 'keyboard_shortcuts.down', defaultMessage: 'to move down in the list' },
  scroll: { id: 'keyboard_shortcuts.scroll', defaultMessage: 'to scroll the page' },
  load: { id: 'keyboard_shortcuts.load', defaultMessage: 'to load new toots' },
  menu: { id: 'keyboard_shortcuts.menu', defaultMessage: 'to open this menu' },
  home: { id: 'keyboard_shortcuts.home', defaultMessage: 'to show home timeline' },
  local: { id: 'keyboard_shortcuts.local', defaultMessage: 'to show local timeline' },
  federated: { id: 'keyboard_shortcuts.federated', defaultMessage: 'to show federated timeline' },
  notifications: { id: 'keyboard_shortcuts.notifications', defaultMessage: 'to show notifications' },
  search: { id: 'keyboard_shortcuts.search', defaultMessage: 'to focus search' },
});

@injectIntl
export default class KeyboradShortcutsModal extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const { formatMessage } = this.props.intl;

    this.shortcuts = [
      {
        group: formatMessage(messages.actions),
        keymap: [
          { keys: ['r'], label: formatMessage(messages.reply) },
          { keys: ['m'], label: formatMessage(messages.mention) },
          { keys: ['f'], label: formatMessage(messages.favourite) },
          { keys: ['b'], label: formatMessage(messages.boost) },
          { keys: ['n'], label: formatMessage(messages.compose) },
          { keys: ['⌘', 'enter'], label: formatMessage(messages.submit) },
        ],
      },
      {
        group: formatMessage(messages.navigation),
        keymap: [
          { keys: ['↑'], label: formatMessage(messages.up) },
          { keys: ['↓'], label: formatMessage(messages.down) },
          { keys: ['space'], label: formatMessage(messages.scroll) },
          { keys: ['.'], label: formatMessage(messages.load) },
          { keys: ['?'], label: formatMessage(messages.menu) },
        ],
      },
      {
        group: formatMessage(messages.timelines),
        keymap: [
          { keys: ['g', 'h'], label: formatMessage(messages.home) },
          { keys: ['g', 'l'], label: formatMessage(messages.local) },
          { keys: ['g', 'f'], label: formatMessage(messages.federated) },
          { keys: ['g', 'n'], label: formatMessage(messages.notifications) },
          { keys: ['s'], label: formatMessage(messages.search) },
        ],
      },
    ];
  }

  handleKeyDown = e => {
    switch(e.key) {
    case 'Enter':
      this.props.onClose();
      break;
    }
  }

  renderItem (items) {
    const { group, keymap } = items;

    return (
      <table className='keyboard-shortcuts__table'>
        <thead className='keyboard-shortcuts__thead'>
          <tr>
            <th colSpan='2'>
              <span>{group}</span>
            </th>
          </tr>
        </thead>

        <tbody className='keyboard-shortcuts__tbody'>
          {keymap.map(keymap => (
            <tr className='keyboard-shortcuts__row' key={keymap.label}>
              <td className='keyboard-shortcuts__row__keys'>
                {keymap.keys.map(key => (<kbd>{key}</kbd>))}
              </td>
              <td className='keyboard-shortcuts__row__label'>
                <span>{keymap.label}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render () {
    const { intl, onClose } = this.props;

    return(
      <div className='modal keyboard-shortcuts-modal'>
        <ModalHeader title={intl.formatMessage({ id: 'modal.keyboard_shortcuts', defaultMessage: 'Keyboard Shortcuts' })} onClose={onClose} autoFocus />

        <div className='keyboard-shortcuts'>
          { this.shortcuts.map(items => this.renderItem(items)) }
        </div>
      </div>
    );
  }

}
