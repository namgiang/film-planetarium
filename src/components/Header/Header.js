import React, { Component } from 'react';
import './Header.css';
// import logo from '../../assets/img/planet-orbit.svg';

import Logo from '../Logo/Logo';
import {Handle, Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { DIRECTORS } from '../../data/directors.js';

import {
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';
import { changeRange, setCurrentActor } from '../../services/actions';

let createHandlers = function(dispatch) {
  let onRangeChanged = function(range) {
    dispatch(changeRange(range));
  };
  let onCurrentActorChanged = function(actor) {
    dispatch(setCurrentActor(actor));
  };

  return {
    onRangeChanged,
    onCurrentActorChanged
  };
}

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
        this.handlers = createHandlers(this.props.dispatch);
	}

	render() {
        return (
        	<div className="header">
            	{ this.renderRange() }
            	<div className="right">  
                	<Logo linkTo='/about' />
                	{ this.renderMenu() }
            	</div>                
        	</div>
       	);
    }

    onDirectorSelected = (value) => {
    	this.setState({
    		currentDirector: value
    	});
        this.handlers.onCurrentActorChanged(null);
    }

    renderRange(): void {
    	return (
        	<div className="left">
            	<label className="min-year">
            	   {this.props.range[0]}
            	</label>
            	<div className="range-container">
                	<Range min={1950}
                    	   max={2015} 
                    	   defaultValue={[this.state.defaultMinYear, this.state.dafaultMaxYear]} 
                    	   tipFormatter={value => `${value}`} 
                    	   handle={this.handle}
                    	   onChange={(value) => this.handlers.onRangeChanged(value)}
                    	   pushable={true} />            
            	</div>
            	<label className="max-year">
            	   {this.props.range[1]}
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

    renderMenu(): void {
    	let directorName = 'All directors';
        const currentDirector = this.props.currentDirector;
    	if (currentDirector !== undefined && currentDirector !== null) {
    		directorName = currentDirector.name
    	} 
    	return (
        	<Menu responsive={true}
            	  label={directorName}
            	  direction="row"
            	  className="director-dropdown"
            	  dropAlign={{right: "right"}} >
            	<Link to='/directors'>
                    <Anchor className="active" onClick={() => this.onDirectorSelected(null)}>
            	       All directors
            	   </Anchor>
                </Link>
            	{this.state.anchorList}
        	</Menu>
    	);
    }

    renderMenuAnchors(): void {
    	return DIRECTORS.map((item, key) => {
    		return (
                <Link to={`/director/${item.label}`}>
                    <Anchor key={item.label}                 	       	
                		    className='active'
                            onClick={() => this.onDirectorSelected(item)}>
        		      {item.name}
        		    </Anchor>
                </Link>
            )
    	});
    } 
  }

function mapStateToProps(state) {
    return {
        range: state.filmApp.movies.range
    };
}

export default connect(mapStateToProps)(Header);