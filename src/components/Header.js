import React, { Component } from 'react';
import './Header.css';

import {Handle, Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { DIRECTORS } from '../data/directors.js';

class Header extends Component {
  constructor(props) {
    super(props);
    const anchors = DIRECTORS.map((item, key) => {
      return <Anchor key={item.label} 
                onClick={() => this.onDirectorSelected(item)}
                className='active'>
                {item.name}
              </Anchor>
    });

    this.state = {
      defaultMinYear: 1960,      
      dafaultMaxYear: 1990,
      minYear: 1960,
      maxYear: 1990, 
      value: 1,
      anchorList: anchors, 
      currentDirector: null
    };
    this.onDirectorSelected = this.onDirectorSelected.bind(this);
  }

  onDirectorSelected = (value) => {
    this.setState({
      currentDirector: value
    });

    this.props.onDirectorChanged(value);
  }
  
  onRangeChanged = (value) => {
    this.setState({
      minYear: value[0],
      maxYear: value[1]
    });
    this.props.onRangeChanged(value);
  }

  render() {
    const director = this.state.currentDirector;
    let directorName = 'Show All';
    if (director !== null) {
      directorName = director.name
    } 
  	return (
  		<div className="header">
  		  <div className="left">
  		    <label>
            Period: {this.state.minYear}-{this.state.maxYear}
          </label>
          <div className="range-container">
            <Range min={1950}
                   max={2015} 
                   defaultValue={[this.state.defaultMinYear, this.state.dafaultMaxYear]} 
                   tipFormatter={value => `${value}`} 
                   handle={this.handle}
                   onChange={this.onRangeChanged}
                   pushable={true} />
            
          </div>
        </div>
        <div className="right">  
          <Menu responsive={true}
              label={directorName}
              direction='row'
              className="director-dropdown">
              <Anchor onClick={() => this.onDirectorSelected(null)}
                className='active'>
                Show All
              </Anchor>
              {this.state.anchorList}
          </Menu>
          <div className="logo">
          </div>
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