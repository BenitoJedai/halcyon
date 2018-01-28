import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ImmutablePropTypes from 'react-immutable-proptypes';

import StatusContainer from '../containers/status_container';
import LoadingIndicator from '../components/loading_indicator';

export default class StatusList extends ImmutablePureComponent {

  static propTypes = {
    statusIds: ImmutablePropTypes.list.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    emptyMessage: PropTypes.node,
  }

  render () {
    const {
      statusIds,
      isLoading,
      emptyMessage,
    } = this.props;

    if ( !isLoading && !statusIds.size ) {
      return <div className='empty-message'>{ emptyMessage }</div>;
    }

    return (
      statusIds.map(statusId => <StatusContainer id={statusId} key={statusId} />)
    );
  }

}
