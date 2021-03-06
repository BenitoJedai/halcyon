import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import {
  pushRecentSearches,
  deleteRecentSearches,
  clearRecentSearches,
  deleteSavedSearches,
} from '../../../actions/search';
import SearchForm from '../components/search_form';
import { List } from 'immutable';

const mapStateToProps = state => ({
  recentSearches: List(),
  savedSearches: List(),
  // recentSearches: state.getIn(['search', 'recentSearches']),
  // savedSearches: state.getIn(['search', 'savedSearches']),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onSearch(q) {
    const trimmedQuery = q.trim();
    const location    = {
      pathname: `/timelines/tag/${encodeURIComponent(trimmedQuery)}`,
    };

    dispatch(pushRecentSearches(trimmedQuery));

    history.push(location);
  },

  onDeleteRecentSearches(index) {
    dispatch(deleteRecentSearches(index));
  },

  onDeleteSavedSearches(index) {
    dispatch(deleteSavedSearches(index));
  },

  onClearRecentSearches() {
    dispatch(clearRecentSearches());
  },
});

export default injectIntl(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm)));
