import React from 'react';
import PropTypes from 'prop-types';
import 'regenerator-runtime/runtime';

import ColorsRow from './ColorsRow.jsx';

const axios = require('axios');
const _ = require('lodash');

class ColorsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      curShoe: -1,
    };
  }

  componentDidUpdate(prevProps) {
    const { ids } = this.props;
    if (ids !== prevProps.ids) {
      this.getImageLinks(ids);
    }
  }

  async getImageLinks(ids) {
    const newState = {};
    for (let i = 0; i < ids.length; i += 1) {
      const { curShoe } = this.props;
      if (ids[i] === curShoe) {
        newState.curShoe = i;
      }
    }
    const { curShoe } = this.props;
    const id = ids.split('-');
    const data = await axios.get(`/:${curShoe}/colors/:${id[0]}`);
    newState.images = _.chunk(data.data, 5);
    this.setState(newState);
  }

  render() {
    const { images, curShoe } = this.state;
    const { changeShoe } = this.props;
    return (
      <div className="shoe_colors_grid">
        {images.map((row, i) => <ColorsRow key={`row_${i + 1}`} changeShoe={changeShoe} curShoe={curShoe - (i * 5)} images={row} row={i.toString()} />)}
      </div>
    );
  }
}


ColorsGrid.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
  curShoe: PropTypes.string,
  changeShoe: PropTypes.func,
};

ColorsGrid.defaultProps = {
  ids: ['no colors'],
  curShoe: '',
  changeShoe: () => {},
};


export default ColorsGrid;
