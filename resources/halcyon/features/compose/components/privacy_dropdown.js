import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import { injectIntl, defineMessages } from 'react-intl';
import detectPassiveEvents from 'detect-passive-events';
import classNames from 'classnames';
import { DropdownMenuCaret } from '../../../components/dropdown_menu';

const messages = defineMessages({
  change: { id: 'privacy.change', defaultMessage: 'Adjust status privacy' },
  direct_long: { id: 'privacy.direct.long', defaultMessage: 'Post to mentioned users only' },
  direct_short: { id: 'privacy.direct.short', defaultMessage: 'Direct' },
  private_long: { id: 'privacy.private.long', defaultMessage: 'Post to followers only' },
  private_short: { id: 'privacy.private.short', defaultMessage: 'Followers-only' },
  public_long: { id: 'privacy.public.long', defaultMessage: 'Post to public timelines' },
  public_short: { id: 'privacy.public.short', defaultMessage: 'Public' },
  unlisted_long: { id: 'privacy.unlisted.long', defaultMessage: 'Do not post to public timelines' },
  unlisted_short: { id: 'privacy.unlisted.short', defaultMessage: 'Unlisted' },
});

const listenerOptions = detectPassiveEvents.hasSupport ? { passive: true } : false;

export class PrivacyDropdownMenu extends React.PureComponent {

  static propTypes = {
    style: PropTypes.object,
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  }

  handleDocumentClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.props.onClose();
    }
  }

  handleClick = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    } else if (!e.key || e.key === 'Enter') {
      const value = e.currentTarget.getAttribute('data-index');

      e.preventDefault();

      this.props.onClose();
      this.props.onChange(value);
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  setRef = c => {
    this.node = c;
  }

  render() {
    const { items, value, style } = this.props;

    return (
      <div className='privacy-dropdown-menu' style={style}>
        <DropdownMenuCaret />

        <div className='privacy-dropdown-menu__options-wrapper' ref={this.setRef}>
          { items.map(item => (
            <a key={item.value} data-index={item.value} onClick={this.handleClick} className={classNames('privacy-dropdown-menu__option', { 'privacy-dropdown-menu__option--active': item.value === value })} >

              <div className='privacy-dropdown-menu__icon'>
                <i className={item.iconClassName} aria-hidden='true' />
              </div>

              <div className='privacy-dropdown-menu__content'>
                <strong className='privacy-dropdown-menu__text'>{item.text}</strong>
                <span className='privacy-dropdown-menu__meta'>{item.meta}</span>
              </div>

            </a>
          )) }
        </div>
      </div>
    );
  }

}

@injectIntl
export default class PrivacyDropdown extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    isUserTouching: PropTypes.func,
    isModalOpen: PropTypes.bool.isRequired,
    onModalOpen: PropTypes.func,
    onModalClose: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    open: false,
  }

  componentWillMount () {
    const { intl } = this.props;

    this.options = [
      {
        value: 'public',
        text: intl.formatMessage(messages.public_short),
        meta: intl.formatMessage(messages.public_long),
        iconClassName: 'icon-globe',
      },
      {
        value: 'unlisted',
        text: intl.formatMessage(messages.unlisted_short),
        meta: intl.formatMessage(messages.unlisted_long),
        iconClassName: 'icon-unlocked-hasp',
      },
      {
        value: 'private',
        text: intl.formatMessage(messages.private_short),
        meta: intl.formatMessage(messages.private_long),
        iconClassName: 'icon-locked-hasp',
      },
      {
        value: 'direct',
        text: intl.formatMessage(messages.direct_short),
        meta: intl.formatMessage(messages.direct_long),
        iconClassName: 'icon-envelope',
      },
    ];
  }

  setTargetRef = c => {
    this.target = c;
  }

  findTarget = () => {
    return this.target;
  }

  handleToggle = () => {
    // if (this.props.isUserTouching()) {
    //   if (this.state.open) {
    //     this.props.onModalClose();
    //   } else {
    //     this.props.onModalOpen({
    //       actions: this.options.map(option => ({ ...option, active: option.value === this.props.value })),
    //       onClick: this.handleModalActionClick,
    //     });
    //   }
    // } else {
    this.setState({ open: !this.state.open });
    // }
  }

  handleModalActionClick = (e) => {
    e.preventDefault();

    const { value } = e.currentTarget.getAttribute('data-index');

    // this.props.onModalClose();
    this.props.onChange(value);
  }

  handleKeyDown = e => {
    switch(e.key) {
    case 'Enter':
      this.handleToggle();
      break;
    case 'Escape':
      this.handleClose();
      break;
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = value => {
    this.props.onChange(value);
  }

  render () {
    const { value }   = this.props;
    const { open }    = this.state;
    const enabledOption = this.options.find(item => item.value === value);

    return (
      <div className={classNames('privacy-dropdown', { 'privacy-dropdown--active': open })} onKeyDown={this.handleKeyDown}>
        <div className='compose-form__button'>
          <button
            className='compose-form__button-icon'
            onClick={this.handleToggle}
            ref={this.setTargetRef}
          >
            <i className={`${enabledOption.iconClassName} `} aria-hidden='true' />
          </button>
        </div>

        <Overlay show={open} placement='bottom' target={this.findTarget}>
          <PrivacyDropdownMenu
            items={this.options}
            value={value}
            onClose={this.handleClose}
            onChange={this.handleChange}
          />
        </Overlay>
      </div>
    );
  }

}
