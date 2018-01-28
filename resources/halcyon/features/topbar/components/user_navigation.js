import React from 'react';
import SearchForm from '../../search_form';
import UserDropdownContainer from '../containers/user_dropdown_container';
import TootButtonContainer from '../../../containers/toot_button_container';

const UserNav = () => (
  <div className='user-navigation'>
    <SearchForm />
    <UserDropdownContainer />
    <TootButtonContainer />
  </div>
);

export default UserNav;
