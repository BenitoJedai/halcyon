import { connect } from 'react-redux';
import SearchFormPopout from '../components/search_form_popout';

const mapStateToProps = state => ({
  value: state.getIn(['search', 'value']),
  submitted: state.getIn(['search', 'submitted']),
  recentSearches: state.getIn(['search', 'recent_searches']),
  savedSearches: state.getIn(['search', 'saved_searches']),
  hashtags: state.getIn(['search', 'results', 'hashtags']),
  accounts: state.getIn(['search', 'results', 'accounts']),
});

export default connect(
  mapStateToProps,
  null,
)(SearchFormPopout);
