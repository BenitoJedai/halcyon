import { connect } from 'react-redux';
import {
  changeSearch,
  submitSearch,
} from '../../../actions/search';
import SuggestionRecentSearch from '../components/suggestion_recent_search';

const mapDispatchToProps = (dispatch, { recentSearch }) => ({

  onClick () {
    dispatch(changeSearch(recentSearch));
    dispatch(submitSearch());
  },

});

export default connect(
  null,
  mapDispatchToProps,
)(SuggestionRecentSearch);
