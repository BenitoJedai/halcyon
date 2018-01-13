import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';
import { WrappedRoute } from './util/react_router_helpers';
import { openModal } from '../../actions/modal';
import { verifyCredentials } from '../../actions/credentials';
import { fetchCustomEmojis } from '../../actions/custom_emojis';

import Topbar from '../topbar';

import {
  HomeTimeline,
  CommunityTimeline,
  PublicTimeline,
  HashtagTimeline,
  ListTimeline,
  Lists,
  Account,
  Share,
  Login,
  NotFound,
} from './util/async-components';

import MobileTootButton from './components/mobile_toot_button';
import MessageContainer from '../../containers/message_container';
import ModalContaienr from '../app/containers/modal_contaienr';

const keyMap = {
  new: 'n',
  back: 'backspace',
};

const mapDispatchToProps = dispatch => ({
  onUpdateState () {
    dispatch(verifyCredentials());
    dispatch(fetchCustomEmojis());
  },

  onOpenModal (type, props) {
    dispatch(openModal(type, props));
  },
});

@connect(null, mapDispatchToProps)
@withRouter
export default class App extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onOpenModal: PropTypes.func.isRequired,
    onUpdateState: PropTypes.func.isRequired,
    isModalOpened: PropTypes.bool,
  }

  static defaultProps = {
    isModalOpened: false,
  }

  componentWillMount () {
    this.props.onUpdateState();
  }

  handleHotkeyOpenComposeFormModal = e => {
    e.preventDefault();
    this.props.onOpenModal('COMPOSE_FORM', {});
  }

  render() {

    const handlers = {
      new: this.handleHotkeyOpenComposeFormModal,
    };

    return (
      <HotKeys keyMap={keyMap} handlers={handlers} >
        <div className='app'>
          <Topbar />
          <MessageContainer />

          <Switch>
            <Redirect exact from='/' to='/timelines/home' />

            <WrappedRoute path='/timelines/home' component={HomeTimeline} />
            <WrappedRoute path='/timelines/public' component={PublicTimeline} />
            <WrappedRoute path='/timelines/public/local' component={CommunityTimeline} />
            <WrappedRoute path='/timelines/tag/:id' component={HashtagTimeline} />
            <WrappedRoute path='/timelines/list/:id' component={ListTimeline} />
            <WrappedRoute path='/accounts/:accountId' component={Account} />

            {/*
            <WrappedRoute exact path='/search/statuses' component={SearchStatuses} />
            <WrappedRoute exact path='/search/accounts' component={SearchAccounts} />
            <WrappedRoute exact path='/search/hashtags' component={SearchHashtags} />
            <WrappedRoute exact path='/notifications' component={Notificaitons} />
            <WrappedRoute exact path='/follow_requests' component={FollowRequests} />
            */}

            {/* <WrappedRoute path='/:acct(@[a-zA-Z0-9_]{1,30}@.+?\..+?)' component={ReverseAccountLookup} /> */}

            <WrappedRoute path='/lists' component={Lists} />
            <WrappedRoute path='/share' component={Share} />
            <WrappedRoute path='/login' component={Login} />
            <WrappedRoute component={NotFound} />
          </Switch>

          <MobileTootButton />
          <ModalContaienr />
        </div>
      </HotKeys>
    );
  }

}
