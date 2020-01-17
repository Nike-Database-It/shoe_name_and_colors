import React from 'react';
import PropTypes from 'prop-types';

const ColorsRow = ({
  images, row, curShoe, changeShoe,
}) => (
  <div className="color_row" id={`row_${row}`}>
    {images.map((image, i) => (
      <div role="presentation" className={`shoe_color_option col_${i} ${curShoe === i ? 'curShoe' : ''}`} key={`row_${i + 1}`} onClick={() => { changeShoe(image.id); }}>
        <img src={image.image} alt="Not found" className={`shoe_color_image ${curShoe === i ? 'curShoe_img' : ''}`} />
      </div>
    ))}
  </div>
);

ColorsRow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  row: PropTypes.string,
  curShoe: PropTypes.number,
  changeShoe: PropTypes.func,
};

ColorsRow.defaultProps = {
  images: [['none', 'none']],
  row: '0',
  curShoe: -1,
  changeShoe: () => {},
};

export default ColorsRow;
