import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

import Logo from '../Logo/Logo';
import { Handle, Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { DIRECTORS } from '../../assets/data/directors.js';
import { changeRange, setCurrentActor, setPosters, fetchPosters } from '../../store/actions';
import { Director } from '../../models/director';


const createHandlers = dispatch => {
	const onRangeChanged = range => {
		dispatch(changeRange(range));
	};
	const onCurrentActorChanged = actor => {
		dispatch(setCurrentActor(actor));
	};
	const onDirectorSelected = async (directorName, range) => {
		await dispatch(setPosters([]));
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
		this.handlers = createHandlers(this.props.dispatch);
	}

	onDirectorSelected = value => {
		this.handlers.onCurrentActorChanged(null);
	}

	render() {
		return (
			<header className="app-header">
				{this.renderRange()}
				<div className="app-header_right">
					<Logo linkTo='/about' />
					{this.renderMenu()}
				</div>
			</header>
		);
	}

	renderRange() {
		return (
			<div className="app-header_left">
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

	renderMenu() {
		let directorName = 'All directors';
		const currentDirector = this.props.currentDirector;
		if (currentDirector !== undefined && currentDirector !== null) {
			directorName = currentDirector.name
		}
		const anchors = this.renderMenuAnchors(directorName);
		return (
			<Menu responsive={true}
				size='small'
				label={directorName}
				direction="row"
				className="menu-director" >
				<Anchor
					href='/directors'
					className={directorName === "All directors" ? 'active' : ''}
					onClick={() => this.onDirectorSelected(null)}>
					All directors
            	   </Anchor>
				{anchors}
			</Menu>
		);
	}

	renderMenuAnchors(directorName) {
		return DIRECTORS.map((item, key) => {
			return (
				<Anchor
					href={'/director/' + item.label}
					key={item.label}
					className={item.name === directorName ? 'active' : ''}
					onClick={() => this.handlers.onDirectorSelected(item.name, this.props.range)}>
					{item.name}
				</Anchor>
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
		range: state.filmApp.app.range,
		currentDirector: state.filmApp.app.currentDirector,
	};
}

export default connect(mapStateToProps)(Header);