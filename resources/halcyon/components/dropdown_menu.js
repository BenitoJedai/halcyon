import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import ImmutablePropTypes from 'react-immutable-proptypes';
import detectPassiveEvents from 'detect-passive-events';
import IconButton from '../components/icon_button';

const listenerOptions = detectPassiveEvents.hasSupport ? { passive: true } : false;

export const DropdownMenuCaret = props => {
  const { style } = props;

  return (
    <div className='dropdown-menu__caret' style={style} >
      <div className='dropdown-menu__caret-outer' />
      <div className='dropdown-menu__caret-inner' />
    </div>
  );
};

export class DropdownMenu extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    items: PropTypes.array.isRequired,
    style: PropTypes.object,
    placement: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
    placement: 'bottom',
  };

  handleDocumentClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.props.onClose();
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

  handleClick = e => {
    const i = Number(e.currentTarget.getAttribute('data-index'));
    const { action, to } = this.props.items[i];

    this.props.onClose();

    if (typeof action === 'function') {
      e.preventDefault();
      action();
    } else if (to) {
      e.preventDefault();
      this.context.router.history.push(to);
    }
  }

  renderItem (option, i) {
    if (option === null) {
      return <li key={`sep-${i}`} className='dropdown-menu__sep' />;
    }

    const { text, href = '#' } = option;

    return (
      <li className='dropdown-menu__list-item' key={`${text}-${i}`}>
        <a href={href} target='_blank' rel='noopener' role='button' tabIndex='0' autoFocus={i === 0} onClick={this.handleClick} data-index={i}>
          {text}
        </a>
      </li>
    );
  }

  render () {
    const { items, style, placement } = this.props;

    return (
      <div className='dropdown-menu' style={style} ref={this.setRef}>
        <DropdownMenuCaret placement={placement} />

        <ul className='dropdown-menu__list'>
          {items.map((option, i) => this.renderItem(option, i))}
        </ul>
      </div>
    );
  }

}

export default class Dropdown extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    icon: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    size: PropTypes.number.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    status: ImmutablePropTypes.map,
    isUserTouching: PropTypes.func,
    isModalOpen: PropTypes.bool.isRequired,
    onModalOpen: PropTypes.func,
    onModalClose: PropTypes.func,
    direction: PropTypes.oneOf(['left', 'right']),
    placement: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
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
    const { icon, items, title, placement, disabled, size, direction } = this.props;
    const { expanded } = this.state;

    return (
      <div onKeyDown={this.handleKeyDown}>
        <IconButton
          icon={icon}
          title={title}
          active={expanded}
          disabled={disabled}
          size={size}
          ref={this.setTargetRef}
          onClick={this.handleClick}
        />

        <Overlay show={expanded} placement={placement} target={this.findTarget}>
          <DropdownMenu
            items={items}
            placement={placement}
            direction={direction}
            onClose={this.handleClose}
          />
        </Overlay>
      </div>
    );
  }

}
