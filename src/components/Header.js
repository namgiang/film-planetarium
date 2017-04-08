import React, { Component } from 'react';
import './Header.css';

import Slider, {Handle, Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minYear: 1960,
      maxYear: 1990
    }
  }


  render() {
  	return (
  		<div className="header">
  		  <div className="filters">
  		    <label>
            Period: {this.state.minYear} - {this.state.maxYear}
          </label>
          <div className="range-container">
            <Range min={1950}
                   max={2000} 
                   defaultValue={[this.state.minYear, this.state.maxYear]} 
                   tipFormatter={value => `${value}`} 
                   handle={this.handle}/>
          </div>  		    
  		  </div>
  		  <div className="logo">
  		  </div>
  		</div>
  	)
  }

  handle(props) {
    const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle {...restProps} />
        </Tooltip>
      );
  } 
}

export default Header;