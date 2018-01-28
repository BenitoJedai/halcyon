import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

@withRouter
export default class PageNavigation extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  shouldComponentUpdate (nextProps) {
    if ( this.props.location.pathname !== nextProps.location.pathname ) {
      return true;
    }
    return false;
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <nav className='page-navigation'>
        <ul className='page-navigation__list'>
          <li className='page-navigation__list-item'>
            <NavLink exact to='/timelines/home' className='page-navigation__link' activeClassName='page-navigation__link--current'>
              <i className={`page-navigation__icon ${ pathname === '/timelines/home' ? 'icon-home-bold' : 'icon-home' }`} />
              <span className='page-navigation__label'><FormattedMessage id='page_navigation.home' defaultMessage='Home' /></span>
            </NavLink>
          </li>

          <li className='page-navigation__list-item'>
            <NavLink exact to='/timelines/public/local' className='page-navigation__link' activeClassName='page-navigation__link--current'>
              <i className={`page-navigation__icon ${ pathname === '/timelines/public/local' ? 'icon-people-bold' : 'icon-people' }`} />
              <span className='page-navigation__label'><FormattedMessage id='page_navigation.local' defaultMessage='Local' /></span>
            </NavLink>
          </li>

          <li className='page-navigation__list-item'>
            <NavLink exact to='/timelines/public' className='page-navigation__link' activeClassName='page-navigation__link--current'>
              <i className={`page-navigation__icon ${ pathname === '/timelines/public' ? 'icon-globe-bold' : 'icon-globe' }`} />
              <span className='page-navigation__label'><FormattedMessage id='page_navigation.federated' defaultMessage='Federated' /></span>
            </NavLink>
          </li>

          <li className='page-navigation__list-item'>
            <NavLink exact to='/notifications' className='page-navigation__link' activeClassName='page-navigation__link--current'>
              <i className={`page-navigation__icon ${ pathname === '/notifications' ? 'icon-bell-bold' : 'icon-bell' }`} />
              <span className='page-navigation__label'><FormattedMessage id='page_navigation.notifications' defaultMessage='Notifications' /></span>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

}
