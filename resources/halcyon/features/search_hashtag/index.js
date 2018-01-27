import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { refreshHashtagTimeline, expandHashtagTimeline } from '../../actions/timelines';

import Dashboard from '../app/components/dashboard';
import Timeline from '../../components/timeline';
import StatusListContainer from '../../containers/status_list_container';

@connect()
export default class HashtagTimeline extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.props.dispatch(refreshHashtagTimeline(this.props.match.params.id));
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        <Timeline>
          <StatusListContainer
            timelineId={`hashtag:${id}`}
            emptyMessage="There's nothing in this hashtag yet"
          />
        </Timeline>

        <Dashboard position='right' />
      </div>
    );
  }

}
