import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ImmutablePropTypes from 'react-immutable-proptypes';
// import { ScrollContainer } from 'react-router-scroll-4';
import {
  fetchAccount,
  fetchFollowers,
  expandFollowers,
} from '../../actions/accounts';

import AccountsList from '../../components/accounts_list';
import LoadingIndicator from '../../components/loading_indicator';

const mapStateToProps = (state, props) => ({
  accountIds: state.getIn(['user_lists', 'followers', props.match.params.accountId, 'items']),
  hasMore: !!state.getIn(['user_lists', 'followers', props.match.params.accountId, 'next']),
});

@connect(mapStateToProps)
export default class AccountFollowers extends ImmutablePureComponent {

  static propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    accountIds: ImmutablePropTypes.list,
    hasMore: PropTypes.bool,
  };

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll);
    this.props.dispatch(fetchAccount(this.props.match.params.accountId));
    this.props.dispatch(fetchFollowers(this.props.match.params.accountId));
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.accountId !== this.props.match.params.accountId && nextProps.match.params.accountId) {
      this.props.dispatch(fetchAccount(nextProps.match.params.accountId));
      this.props.dispatch(fetchFollowers(nextProps.match.params.accountId));
    }
  }

  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight && this.props.hasMore) {
      this.props.dispatch(expandFollowers(this.props.match.params.accountId));
    }
  }

  render() {
    const { accountIds, hasMore = true } = this.props;

    if (!accountIds) {
      return <LoadingIndicator />;
    }

    return (
      <AccountsList
        accountIds={accountIds}
        hasMore={hasMore} // 使うか未定
      />
    );
  }

}
