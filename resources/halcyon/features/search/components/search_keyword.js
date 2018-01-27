import React from 'react';
import PropTypes from 'prop-types';

export default class SearchKeyword extends React.PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  render () {
    const { id } = this.props;

    return (
      <div className='search-keyword'>
        <h2 className='search-keyword-inner'>{ id }</h2>
      </div>
    );
  }

}
