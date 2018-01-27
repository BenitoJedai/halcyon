import { connect } from 'react-redux';
import { makeGetAccount } from '../../../selectors';
import SuggestionAccount from '../components/suggestion_account';

const makeMapStateToProps = () => {
  const getAccount = makeGetAccount();

  const mapStateToProps = (state, { accountId }) => ({
    account: getAccount(state, accountId),
  });

  return mapStateToProps;
};

export default connect(
  makeMapStateToProps,
)(SuggestionAccount);
