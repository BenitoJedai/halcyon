import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Switch, Route } from 'react-router-dom';

import Page from '../app/components/page';
import Content from '../app/components/content';
import Dashboard from '../app/components/dashboard';
import SearchHeader from './components/serach_header';

import SearchAccounts from '../search_accounts';
import SearchStatuses from '../search_statuses';
import SearchHashtag from '../search_hashtag';

export default class Search extends ImmutablePureComponent {

  render () {
    return (
      <Page>
        <SearchHeader />

        <Content>
          <Dashboard />

          <Switch>
            <Route exact path='/search/tag/:id' component={SearchHashtag} />
            <Route exact path='/search/statuses/:id' component={SearchStatuses} />
            <Route exact path='/search/accounts/:id' component={SearchAccounts} />
          </Switch>
        </Content>
      </Page>
    );
  }

}
