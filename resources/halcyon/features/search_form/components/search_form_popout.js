import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';

import { DropdownMenuCaret } from '../../../components/dropdown_menu';
import SuggestionAccount from '../containers/suggestion_account_container';
import SuggestionHashtag from './suggestion_hashtag';
import SuggestionRecentSearch from '../containers/suggestion_recent_search_container';
import SuggestionSavedSearch from './suggestion_saved_search';

export default class SearchFromPopout extends React.PureComponent {

  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    recentSearches: ImmutablePropTypes.list,
    savedSearches: ImmutablePropTypes.list,
    accounts: ImmutablePropTypes.list,
    hashtags: ImmutablePropTypes.list,
  }

  static defaultProps = {
    style: {},
  }

  render () {
    const {
      style,
      submitted,
      recentSearches,
      savedSearches,
      accounts,
      hashtags,
    } = this.props;

    return (
      <div className='search-form-popout dropdown-menu' style={style}>
        <DropdownMenuCaret />

        {
          submitted ? (
            <div className='search-form-suggestion'>
              <ul className='suggestion-hashtags'>
                {
                  hashtags.size ? (
                    hashtags.map(hashtag => <SuggestionHashtag hashtag={hashtag} key={hashtag} />)
                  ) : (
                    <FormattedMessage id='search_form.no_results' defaultMessage='There are no results' />
                  )
                }
              </ul>

              <div className='search-form-suggestion__sep' aria-hidden='true' />

              <ul className='suggestion-accounts'>
                {
                  accounts.size ? (
                    accounts.map(account => <SuggestionAccount accountId={account} key={account} />)
                  ) : (
                    <FormattedMessage id='search_form.no_results' defaultMessage='There are no results' />
                  )
                }
              </ul>
            </div>
          ) : (
            <div className='search-form-suggestion'>
              <ul className='suggestion-recent-searches'>
                <h3 className='search-form-suggestion__title'>
                  <FormattedMessage id='search_form.history' defaultMessage='Recent searches' />
                </h3>
                {
                  recentSearches.size ? (
                    recentSearches.map(recentSearch => <SuggestionRecentSearch recentSearch={recentSearch} key={recentSearch} />)
                  ) : (
                    <FormattedMessage id='search_form.history.empty' defaultMessage='Recent searches' />
                  )
                }
              </ul>

              <div className='search-form-suggestion__sep' aria-hidden='true' />

              <ul className='suggestion-saved-searches'>
                <h3 className='search-form-suggestion__title'>
                  <FormattedMessage id='search_form.saved_keywords' defaultMessage='Saved seraches' />
                </h3>
                {
                  savedSearches.size ? (
                    savedSearches.map(savedSearch => <SuggestionSavedSearch savedSearch={savedSearch} key={savedSearch} />)
                  ) : (
                    <FormattedMessage id='search_form.saved_keywords.empty' defaultMessage='Saved seraches' />
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }

}
