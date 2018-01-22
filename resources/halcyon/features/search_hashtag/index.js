import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { refreshHashtagTimeline, expandHashtagTimeline } from '../../actions/timelines';
import { me } from '../../initial_state';

import Page from '../app/components/page';
import Content from '../app/components/content';
import Dashborad from '../app/components/dashboard';
import ProfileCard from '../../containers/profile_card_container';

import Timeline from '../../components/timeline';
import StatusListContainer from '../../containers/status_list_container';

@connect()
export default class HashtagTimeline extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.props.dispatch(refreshHashtagTimeline(this.props.params.id));
  }

  render() {
    const { id } = this.props.params;

    return (
      <Page>
        <Content>
          <Dashborad position='left'>
            <ProfileCard accountId={me} withCounters />
          </Dashborad>

          <Timeline>
            <StatusListContainer timelineId={`hashtag:${id}`} />
          </Timeline>

          <Dashborad position='right' />
        </Content>
      </Page>
    );
  }

}
