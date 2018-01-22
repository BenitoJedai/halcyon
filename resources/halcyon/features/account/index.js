import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import ImmutablePureComponent from 'react-immutable-pure-component';

import Page from '../app/components/page';
import Content from '../app/components/content';
import Dashborad from '../app/components/dashboard';

import AccountHeaderContainer from '../account/containers/account_header_container';
import AccountLetterheadContainer from '../account/containers/letterhead_container';

import AccountTimeline from '../account_timeline';
import AccountFollowers from '../account_followers';
import AccountFollowing from '../account_following';

// This component's just renders left side dashboard
// And trough account Id as param of child component
export default class Account extends ImmutablePureComponent {

  static propTypes = {
    params: PropTypes.object.isRequired,
  };

  render () {
    // Create common location object between AccountHeaderContainer and
    // the content instead of props.location
    const location = { ...window.location };

    return (
      <Page>
        <AccountHeaderContainer
          location={location}
          accountId={this.props.params.accountId}
        />

        <Content>
          <Dashborad position='left'>
            <AccountLetterheadContainer accountId={this.props.params.accountId} />
          </Dashborad>

          <Switch location={location}>
            <Route exact path='/accounts/:accountId/following' component={AccountFollowing} />
            <Route exact path='/accounts/:accountId/followers' component={AccountFollowers} />
            <Route path='/accounts/:accountId' component={AccountTimeline} />
          </Switch>
        </Content>
      </Page>
    );
  }

}
