import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import detectPassiveEvents from 'detect-passive-events';
import {
  changeSearch,
  submitSearch,
  clearSearch,
  showSearch,
} from '../../actions/search';

import IconButton from '../../components/icon_button';
import SearchFormPopout from './containers/search_form_popout_container';

const listenerOptions = detectPassiveEvents.hasSupport ? { passive: true } : false;

const messages = defineMessages({
  placeholder: { id: 'search_form.placeholder', defaultMessage: 'Search Mastodon' },
});

const mapStateToProps = state => ({
  value: state.getIn(['search', 'value']),
  submitted: state.getIn(['search', 'submitted']),
});

const mapDispatchToProps = dispatch => ({

  onChange (value) {
    dispatch(changeSearch(value));
  },

  onSubmit () {
    dispatch(submitSearch());
  },

  onClear () {
    dispatch(clearSearch());
  },

  onShow () {
    dispatch(showSearch());
  },

});

@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
@withRouter
export default class SearchForm extends React.Component {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
  };

  state = {
    expanded: false,
    selectedSuggestion: 0,
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  setFormRef = c => {
    this.form = c;
  }

  setInputRef = c => {
    this.input = c;
  }

  findTarget = () => {
    return this.form;
  }

  handleChange = e => {
    const value = e.target.value;
    this.props.onChange(value);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  }

  handleClear = e => {
    e.preventDefault();
    this.props.onClear();
  }

  handleFocus = () => {
    this.setState({ expanded: true });
    this.props.onShow();
  }

  handleDocumentClick = e => {
    if (
      (this.form && !this.form.contains(e.target)) &&
      (!e.target.parentElement.classList.contains('suggestion-recent-search') &&!e.target.parentElement.classList.contains('suggestion-saved-search'))
    ) {
      this.setState({ expanded: false });
    }
  }

  handleKeyDown = e => {
    switch(e.key) {
    case 'Enter':
      e.preventDefault();
      this.props.onSubmit();
      break;

    case 'Escape':
      document.querySelector('.app').parentElement.focus();
      break;
    }
  }

  render() {
    const { intl, value, submitted } = this.props;
    const { expanded } = this.state;

    return (
      <div
        role='search'
        className='search-form'
        ref={this.setFormRef}
      >
        <input
          id='search-form-input'
          className='search-form__input'
          ref={this.setInputRef}
          type='text'
          value={value}
          spellCheck='false'
          placeholder={intl.formatMessage(messages.placeholder)}
          aria-autocomplete='list'
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />

        <IconButton
          className='search-form__button'
          title='Search'
          icon={submitted && expanded ? 'icon-time' : 'icon-loupe'}
          onClick={submitted && expanded ? this.handleClear : this.handleSubmit}
        />

        <Overlay show={expanded} placement='bottom' target={this.findTarget}>
          <SearchFormPopout />
        </Overlay>
      </div>
    );
  }

}
