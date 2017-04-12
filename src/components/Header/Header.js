import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/img/planet-orbit.svg';
import planet1 from '../../assets/img/planet-1.svg';

import {Handle, Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { DIRECTORS } from '../../data/directors.js';

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
      defaultMinYear: 1955,      
      dafaultMaxYear: 2010,
      minYear: 1955,
      maxYear: 2010, 
      value: 1,
      anchorList: anchors, 
      currentDirector: null,
      aboutOpened: false,
      firstOpen: true
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

  onLogoClick = () => {
    this.setState((prevState, props) => ({
      aboutOpened: !prevState.aboutOpened,
      firstOpen: false
    }));
  }

  render() {
    const aboutClassName = (this.state.aboutOpened) ? 'about opened' : 'about';
    const director = this.state.currentDirector;
    let directorName = 'All directors';
    if (director !== null) {
      directorName = director.name
    } 
  	return (
  		<div className="header">
        { !this.state.firstOpen &&
          <div className={aboutClassName}>
            <p>FILM PLANETARIUM</p>
            <p>A visualization of the relationship between directors and their collaborated actors/actresses.</p>
            <p>Designed by Nam Giang and Francesco Vitale.</p>
            <p>Developed by Nam Giang.</p>
            <div className="planet-img-container"><img src={planet1} alt="planet-1" /></div>
          </div>
        } 
  		  <div className="left">
  		    <label className="period">
            Period: {this.state.minYear}-{this.state.maxYear}
          </label>
          <label className="min-year">
            {this.state.minYear}
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
          <label className="max-year">
            {this.state.maxYear}
          </label>
        </div>
        <div className="right">  
          <div className="logo">
            <img src={logo}
                 alt="logo"
                 onClick={this.onLogoClick} />
          </div>
          <Menu responsive={true}
                label={directorName}
                direction="row"
                className="director-dropdown"
                dropAlign={{right: "right"}}
                >
              <Anchor onClick={() => this.onDirectorSelected(null)}
                className="active">
                All directors
              </Anchor>
              {this.state.anchorList}
          </Menu>
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
          placement="bottom"
          key={index}
        >
          <Handle {...restProps} />
        </Tooltip>
      );
  } 
}

export default Header;