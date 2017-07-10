import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

import Logo from '../Logo/Logo';
import {Handle, Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import MoviesService from '../../services/movies';
import { DIRECTORS } from '../../data/directors.js';

import { changeRange, setCurrentActor, setPosters, fetchPosters } from '../../actions';


let createHandlers = function(dispatch) {
  let onRangeChanged = function(range) {
    dispatch(changeRange(range));
  };
  let onCurrentActorChanged = function(actor) {
    dispatch(setCurrentActor(actor));
  };
  let onDirectorSelected = (directorName, range) => {
    dispatch(setPosters([]));
    dispatch(fetchPosters(directorName, range));
  };

  return {
    onRangeChanged,
    onCurrentActorChanged,
    onDirectorSelected
  };
}

class Header extends Component {
	constructor(props) {
		super(props);
		this.onDirectorSelected = this.onDirectorSelected.bind(this);
        this.handlers = createHandlers(this.props.dispatch);
	}

    onDirectorSelected = (value) => {
        this.handlers.onCurrentActorChanged(null);
    }

	render() {
        return (
        	<header className="app-header">
            	{ this.renderRange() }
            	<div className="app-header__right">  
                	<Logo linkTo='/about' />
                	{ this.renderMenu() }
            	</div>                
        	</header>
       	);
    }

    renderRange(): void {
    	return (
        	<div className="app-header__left">
            	<label className="label--min-year">
            	   {this.props.range[0]}
            	</label>
            	<div className="range-container">
                	<Range min={1950}
                    	   max={2015} 
                    	   defaultValue={[1955, 2010]} 
                    	   tipFormatter={value => `${value}`} 
                    	   handle={this.handle}
                    	   onChange={(value) => this.handlers.onRangeChanged(value)}
                    	   pushable={true} />            
            	</div>
            	<label className="label--max-year">
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
        const anchors = this.renderMenuAnchors(directorName);
    	return (
        	<Menu responsive={true}
            	  label={directorName}
            	  direction="row"
            	  className="menu-director" >
            	<Link to='/directors'>
                    <Anchor className={directorName === "All directors" ? 'active' : ''}
                            onClick={() => this.onDirectorSelected(null) }>
            	       All directors
            	   </Anchor>
                </Link>
            	{anchors}
        	</Menu>
    	);
    }

    renderMenuAnchors(directorName): void {
    	return DIRECTORS.map((item, key) => {
    		return (
                <Link to={`/director/${item.label}`} key={item.label}>
                    <Anchor key={item.label}                 	       	
                		    className={item.name === directorName ? 'active' : ''}
                            onClick={() => this.handlers.onDirectorSelected(item.name, this.props.name)}>
        		      {item.name}
        		    </Anchor>
                </Link>
            )
    	});
    } 
  }

function mapStateToProps(state) {
    return {
        range: state.filmApp.app.range
    };
}

export default connect(mapStateToProps)(Header);