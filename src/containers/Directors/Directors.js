import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Directors.css';
import Planet from '../../components/Planet/Planet';
import { DIRECTORS } from '../../assets/data/directors';
import { setCurrentDirector } from '../../store/actions';

const createHandlers = dispatch => {
    const onCurrentDirectorChanged = () => {
        dispatch(setCurrentDirector(null));
    };
    return {
        onCurrentDirectorChanged,
    };
}

class Directors extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.handlers.onCurrentDirectorChanged();
    }

    createDirectorList() {
        return DIRECTORS.map((director, index) => {
            return (
                <Link to={`/director/${director.label}`} key={director.label} className="directors-container--director" >
                    <div className="directors-container--director-planet" key={`mini-director-${director.label}`}>
                            <Planet director={director}
                                imageUrls={[]}
                                actorMovies={[]}
                                mini={true}
                                range={this.props.range}
                                onActorClicked={() => { }} />
                        </div>
                        <p className="directors-container--director-name">
                            {director.name}
                        </p>
                </Link>
            )
        });
    }

    render() {
        document.body.style.overflowY = 'auto';
        return (
            <div className="directors-container">
                {this.createDirectorList()}
            </div>
        );
    }
}

Directors.propTypes = {
    range: PropTypes.arrayOf(PropTypes.number),
    dispatch: PropTypes.func
}

const mapStateToProps = state => {
    return {
        range: state.app.range
    };
}

export default connect(mapStateToProps)(Directors);
