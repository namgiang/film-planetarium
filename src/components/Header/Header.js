import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

import Logo from '../Logo/Logo';
import { Handle, Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { DIRECTORS } from '../../assets/data/directors.js';
import { changeRange, setCurrentActor, setPosters, fetchPosters, setCurrentDirector } from '../../store/actions';
import { Director } from '../../models/director';


const createHandlers = dispatch => {
	const onRangeChanged = range => {
		dispatch(changeRange(range));
	};
	const onCurrentActorChanged = actor => {
		dispatch(setCurrentActor(actor));
	};
	const onDirectorSelected = async (director, range) => {
		await dispatch(setPosters([]));
		dispatch(setCurrentDirector(director));
		await dispatch(fetchPosters(director.name, range));
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
		this.handlers = createHandlers(this.props.dispatch);
	}

	onDirectorSelected = () => {
		this.handlers.onCurrentActorChanged(null);
	}

	render() {
		return (
			<React.Fragment>
				<header className='app-header'>
					{!this.props.onlyLogo && this.renderRange()}
					{
						!this.props.onlyLogo &&
						<div className='app-header_right'>
							{this.renderMenu()}
						</div>
					}
				</header>
				<Logo linkTo={this.props.onlyLogo ? '/directors' : '/about'}/>
			</React.Fragment>
		);
	}

	renderRange() {
		return (
			<section className='app-header_left'>
				<label className='label-min-year'>
					{this.props.range[0]}
				</label>
				<div className='range-container'>
					<Range min={1950}
						max={2015}
						defaultValue={this.props.range}
						tipFormatter={value => `${value}`}
						handle={this.handle}
						onChange={(value) => this.handlers.onRangeChanged(value)}
						pushable={true} />
				</div>
				<label className='label-max-year'>
					{this.props.range[1]}
				</label>
			</section>
		);
	}

	handle(props) {
		const { value, dragging, index, ...restProps } = props;
		return (
			<Tooltip prefixCls='rc-slider-tooltip'
				overlay={value}
				visible={dragging}
				placement='top'
				key={index} >
				<Handle {...restProps} />
			</Tooltip>
		);
	}

	renderMenu() {
		const directorName = this.props.currentDirector ? this.props.currentDirector.name : 'All directors';
		const anchors = this.renderMenuAnchors(directorName);
		return (
			<Menu 
				responsive={true}
				size='small'
				label={directorName}
				direction='row'
				className='menu-director' >
				<Link to='/directors'>
				    <Anchor
						tag='span'
						className={directorName === 'All directors' ? 'active' : ''}
						onClick={() => this.onDirectorSelected()}>
						All directors
            	    </Anchor>
				</Link>
				{anchors}
			</Menu>
		);
	}

	renderMenuAnchors(directorName) {
		return DIRECTORS.map((item, key) => {
			return (
				<Link to={`/director/${item.label}`} key={item.label}>
					<Anchor
						tag='span'
						key={item.label}
						className={item.name === directorName ? 'active' : ''}
						onClick={() => this.handlers.onDirectorSelected(item, this.props.range)}>
						{item.name}
					</Anchor>
				</Link>
			)
		});
	}
}

Header.propTypes = {
	range: PropTypes.arrayOf(PropTypes.number),
	currentDirector: Director
}

const mapStateToProps = state => {
	return {
		range: state.app.range,
		currentDirector: state.app.currentDirector,
		onlyLogo: state.router.location.pathname === '/about'
	};
}

export default connect(mapStateToProps)(withRouter(Header));