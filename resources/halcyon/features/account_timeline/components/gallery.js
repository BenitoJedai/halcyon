import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { List as ImmutableList } from 'immutable';
import { fetchAccount } from '../../../actions/accounts';
import { refreshAccountMediaTimeline, expandAccountTimeline } from '../../../actions/timelines';

import Timeline from '../../../components/timeline';
import TimelineHeader from './timeline_header';
import StatusList from '../../../components/status_list';
import LoadingIndicator from '../../../components/loading_indicator';

const mapStateToProps = (state, props) => ({
  statusIds: state.getIn(['timelines', `account:${props.match.params.accountId}:media`, 'items'], ImmutableList()),
  isLoading: state.getIn(['timelines', `account:${props.match.params.accountId}:media`, 'isLoading']),
  hasMore: !!state.getIn(['timelines', `account:${props.match.params.accountId}:media`, 'next']),
});

@connect(mapStateToProps)
export default class Gallery extends ImmutablePureComponent {

  static propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    statusIds: ImmutablePropTypes.list,
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
  }

  componentWillMount () {
    this.props.dispatch(fetchAccount(this.props.match.params.accountId));
    this.props.dispatch(refreshAccountMediaTimeline(this.props.match.params.accountId));
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.accountId !== this.props.match.params.accountId && nextProps.match.params.accountId) {
      this.props.dispatch(fetchAccount(nextProps.match.params.accountId));
      this.props.dispatch(refreshAccountMediaTimeline(nextProps.match.params.accountId));
    }
  }

  render () {
    const { statusIds } = this.props;

    return (
      <Timeline>
        <TimelineHeader id={this.props.match.params.accountId} />
        { statusIds.size ? <StatusList statusIds={statusIds} /> : <LoadingIndicator /> }
      </Timeline>
    );
  }

}
