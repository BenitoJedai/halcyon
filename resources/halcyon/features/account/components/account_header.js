import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { FormattedMessage } from 'react-intl';
import { autoPlayGif } from '../../../initial_state';

import AccountNavigation from '../components/account_navigation';
import FollowButtonContainer from '../../../containers/follow_button_container';

export default class AccountHeader extends ImmutablePureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map,
    location: PropTypes.object.isRequired,
    onChangeHeader: PropTypes.func.isRequired,
    isEditing: PropTypes.bool,
  }

  state = {
    headerPreviewUrl: null,
  }

  componentWillReceiveProps (nextProps) {
    if ( this.props.isEditing && !nextProps.isEditing ) {
      this.setState({ headerPreviewUrl: null });
    }
  }

  handleChangeHeader = e => {
    if (e.target.files.length === 1) {
      this.props.onChangeHeader(e.target.files);

      let fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onloadend = e => {
        this.setState({ headerPreviewUrl: e.target.result });
      };
    }
  }

  render () {
    const { account, location, isEditing } = this.props;
    const { headerPreviewUrl } = this.state;

    if ( !account ) {
      return <div />;
    }

    const src = autoPlayGif ? account.get('header') : account.get('header_static');
    const previewSrc = isEditing && headerPreviewUrl;

    return(
      <header className='account-header'>
        <div className='account-header__header' style={{ backgroundImage: `url(${previewSrc || src})` }}>
          {
            isEditing && (
              <div className='account-header__header-upload'>
                <label>
                  <div className='account-header__header-upload-label'>
                    <i className='icon-photo' aria-hidden='true' />
                    <FormattedMessage id='account.edit_header' defaultMessage='Upload header image' />
                  </div>

                  <input
                    type='file'
                    multiple='false'
                    onChange={this.handleChangeHeader}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )
          }
        </div>

        <div className='account-header__banner'>
          <div className='account-header__banner-inner'>
            <AccountNavigation account={account} location={location} />

            <div className='account-header-follow-button'>
              <FollowButtonContainer accountId={account.get('id')} />
            </div>
          </div>
        </div>
      </header>
    );
  }

}
