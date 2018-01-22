import React from 'react';
import PropTypes from 'prop-types';
import ImmurablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';

import Avatar from '../containers/avatar_container';
import IconButton from '../components/icon_button';
import LoadingIndicator from './loading_indicator';

const messages = defineMessages({
  delete: { id: 'recommended_users.delete', defaultMessage: 'Delete this user from recommendation list' },
});

export default class RecommendedAccounts extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    accounts: ImmurablePropTypes.list,
    is_fetching: PropTypes.bool.isRequired,
    limit: PropTypes.number,
    onFetch: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static defaultProps = {
    limit: 3,
  }

  componentWillMount () {
    if ( !this.props.accounts.size && !this.props.is_fetching ) {
      this.props.onFetch();
    }
  }

  handleDeleteItem = e => {
    e.preventDefault();
    const index = e.currentTarget.getAttribute('data-index');
    this.props.onDelete(index);
  }

  renderItem = (account, index) => {
    const { intl } = this.props;
    const displayNameHtml = { __html: account.get('display_name_html') };
    const noteHtml        = { __html: account.get('note_emojified') };

    return (
      <li className='recommended-account' key={account.get('acct')}>
        <div className='recommended-account__avatar'>
          <Link to={`/${account.get('acct')}`}>
            <Avatar account={account} size={48} />
          </Link>
        </div>

        <div className='recommended-account__meta'>
          <div className='recommended-account__name'>
            <Link to={`/${account.get('acct')}`}>
              <span className='recommended-account__display-name' dangerouslySetInnerHTML={displayNameHtml} />

              <span className='recommended-account__acct'>
                { account.get('acct') }
              </span>
            </Link>
          </div>

          <div className='recommended-account__note' dangerouslySetInnerHTML={noteHtml} />

          <IconButton
            className='recommended-account__delete-button'
            icon='icon-time'
            title={intl.formatMessage(messages.delete)}
            onClick={this.handleDeleteItem}
            data-index={index}
          />
        </div>
      </li>
    );
  }

  render () {
    const { accounts, is_fetching, limit } = this.props;

    return (
      <div className='recommended-accounts'>
        <header className='recommended-accounts__header'>
          <h3 className='recommended-accounts__title'>
            <FormattedMessage id='recommended_users.title' defaultMessage='Who to follow' />
          </h3>

          <button
            className='recommended-accounts__refresh link-button'
            onClick={this.props.onFetch}
            disabled={is_fetching}
          >
            <FormattedMessage id='recommended_users.refresh' defaultMessage='Refresh' />
          </button>
        </header>

        {
          !is_fetching ? (
            <ul className='recommended-accounts__list'>
              { accounts.slice(0, limit).map((account, index) => this.renderItem(account, index)) }
            </ul>
          ) : (
            <LoadingIndicator withLabel={false} />
          )
        }

        <footer className='recommended-accounts__footer'>
          <a href='http://vinayaka.distsn.org' target='_blank' rel='noopener'>
            Powered by Mastodon User Matching
          </a>
        </footer>
      </div>
    );

  }

}
