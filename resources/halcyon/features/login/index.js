import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { withRouter } from 'react-router-dom';
import {
  verifyInstance,
  verifyResponse,
} from '../../actions/login';
import querystring from 'querystring';
import {
  INITIAL_STATE_KEY,
  DEFAULT_INITIAL_STATE,
} from '../../constants';

import Page from '../app/components/page';
import Content from '../app/components/content';

const mapStateToProps = state => ({
  certificates: state.getIn(['login', 'certificates']),
  authorizationUri: state.getIn(['login', 'authorization_uri']),
  isVerifyingInstance: state.getIn(['login', 'is_verifying_instance']),
  isVerifyingResponse: state.getIn(['login', 'is_verifying_response']),
});

const mapDispatchToProps = dispatch => ({
  onVerifyInstance (instance_domain) {
    dispatch(verifyInstance(instance_domain));
  },

  onVerifyResponse (instance_domain, code) {
    dispatch(verifyResponse(instance_domain, code));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class Login extends ImmutablePureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    certificates: ImmutablePropTypes.map,
    authorizationUri: PropTypes.string,
    isVerifyingInstance: PropTypes.bool.isRequired,
    isVerifyingResponse: PropTypes.bool.isRequired,
    onVerifyInstance: PropTypes.func.isRequired,
    onVerifyResponse: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const { instance_domain, code } = querystring.decode(this.props.location.search.substr(1));

    if ( instance_domain && code ) {
      this.props.onVerifyResponse(instance_domain, code);
    }
  }

  componentWillReceiveProps (nextProps) {
    if ( !this.props.authorizationUri && nextProps.authorizationUri && this.props.isVerifyingInstance && !nextProps.isVerifyingInstance ) {
      window.location.href = nextProps.authorizationUri;
    }

    if ( !this.props.certificates && nextProps.certificates && this.props.isVerifyingResponse && !nextProps.isVerifyingResponse ) {
      this.setInitialState(nextProps.certificates);
      window.location.href = '/';
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const value = this.input.value.split('@')[2];
    this.props.onVerifyInstance(value);
  }

  setInitialState = ({ instance_domain, access_token }) => {
    const initialState = { ...DEFAULT_INITIAL_STATE };

    initialState.meta.streaming_api_base_url = `wss://${instance_domain}`;
    initialState.meta.access_token = access_token;
    initialState.meta.domain = instance_domain;

    window.localStorage.setItem(INITIAL_STATE_KEY, JSON.stringify(initialState));
  }

  setRef = c => {
    this.input = c;
  }

  render () {
    const { isVerifyingInstance } = this.props;

    return (
      <Page>
        <Content>
          <form onSubmit={this.handleSubmit} >
            <input type='text' className='default-css' ref={this.setRef} />
            <input type='submit' className='round-button' disabled={isVerifyingInstance} />
          </form>
        </Content>
      </Page>
    );
  }

}
