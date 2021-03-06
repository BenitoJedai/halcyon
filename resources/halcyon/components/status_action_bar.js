import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

import IconButton from '../components/icon_button';
import DropdownMenuContainer from '../containers/dropdown_menu_container';

export default class StatusActionBar extends ImmutablePureComponent {

  static propTypes = {
    status: ImmutablePropTypes.map,
  }

  render () {
    return (
      <div className='status-action-bar'>

        <div className='status-action-bar__item'>
          <IconButton
            className='status-action-bar__button'
            icon='icon-bubble'
          />
        </div>


        <div className='status-action-bar__item'>
          <IconButton
            className='status-action-bar__button'
            icon='icon-reblog'
          />
        </div>

        <div className='status-action-bar__item'>
          <IconButton
            className='status-action-bar__button'
            icon='icon-star'
          />
        </div>

        <div className='status-action-bar__item'>
          <DropdownMenuContainer
            icon='icon-ellipsis-h'
            items={[
              { text: '詳細を表示', href: '#' },
              { text: '埋め込み', href: '#' },
              null,
              { text: '返信', href: '#' },
              null,
              { text: 'ミュート', href: '#' },
              { text: 'ブロック', href: '#' },
              { text: '通報', href: '#' },
            ]}
          />
        </div>

      </div>
    );
  }

}
