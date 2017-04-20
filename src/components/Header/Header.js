import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/img/planet-orbit.svg';

import About from '../About/About';
import {Handle, Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { DIRECTORS } from '../../data/directors.js';

class Header extends Component {
	constructor(props) {
		super(props);
		const anchors = this.renderMenuAnchors();
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

	render() {
        // disable scrolling when About is displayed
        if (this.state.aboutOpened) {
        	document.body.style.overflowY = 'hidden';
        } else {
        	document.body.style.overflowY = 'auto';
        }
        const aboutClassName = (this.state.aboutOpened) ? 'about opened' : 'about';

        return (
        	<div className="header">
            	{ !this.state.firstOpen && <About aboutClassName={aboutClassName} /> } 
            	{ this.renderRange() }
            	<div className="right">  
                	{ this.renderLogo() }
                	{ this.renderMenu() }
            	</div>
        	</div>
       	);
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

    renderRange(): void {
    	return (
        	<div className="left">
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
    	);
    }

    handle(props) {
    	const { value, dragging, index, ...restProps } = props;
    	return (
        	<Tooltip prefixCls="rc-slider-tooltip"
                	 overlay={value}
                	 visible={dragging}
                	 placement="top"
                	 key={index} >
        	   <Handle {...restProps} />
        	</Tooltip>
    	);
    }

    renderLogo(): void {
    	return (
        	<div className="logo">
            	<img src={logo}
                	 alt="logo"
                	 onClick={this.onLogoClick} />
        	</div>
    	);
    }

    renderMenu(): void {
    	let directorName = 'All directors';
    	if (this.state.currentDirector !== null) {
    		directorName = this.state.currentDirector.name
    	} 
    	return (
        	<Menu responsive={true}
            	  label={directorName}
            	  direction="row"
            	  className="director-dropdown"
            	  dropAlign={{right: "right"}} >
            	<Anchor onClick={() => this.onDirectorSelected(null)}
            	        className="active">
            	   All directors
            	</Anchor>
            	{this.state.anchorList}
        	</Menu>
    	);
    }

    renderMenuAnchors(): void {
    	return DIRECTORS.map((item, key) => {
    		return (
                <Anchor key={item.label} 
                		onClick={() => this.onDirectorSelected(item)}
                		className='active'>
        		    {item.name}
        		</Anchor>
            )
    	});
    } 
  }

  export default Header;