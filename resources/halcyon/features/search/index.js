import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Switch, Route } from 'react-router-dom';
import { me } from '../../initial_state';

import Page from '../app/components/page';
import Content from '../app/components/content';
import Dashboard from '../app/components/dashboard';
import ProfileCard from '../../containers/profile_card_container';

import SearchHeader from './components/search_header';
// import SearchAccounts from '../search_accounts';
// import SearchStatuses from '../search_statuses';
import SearchHashtag from '../search_hashtag';

export default class Search extends React.Component {

  render () {
    const location = { ...window.location };

    return (
      <Page>
        <SearchHeader location={location} />

        <Content>
          <Dashboard position='left'>
            <ProfileCard accountId={me} />
          </Dashboard>

          <Switch>
            <Route exact path='/search/hashtag/:id' component={SearchHashtag} />
            {/* <Route exact path='/search/statuses/:id' component={SearchStatuses} /> */}
            {/* <Route exact path='/search/accounts/:id' component={SearchAccounts} /> */}
          </Switch>
        </Content>
      </Page>
    );
  }

}
