import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Directors.css';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import Planet from '../Planet/Planet';

import { DIRECTORS } from '../../data/directors';


class Directors extends Component {
    
    createDirectorList() {
        const emptyArray = [];
        return DIRECTORS.map((director, index) => {
            return (
                <Link to={`/director/${director.label}`} key={director.label} >
                    <div className="planets" key={'mini-director-' + director.label}>
                        <div className="planet-container">
                            <Planet director={director}
                                    imageUrls={emptyArray}
                                    actorMovies={emptyArray}
                                    mini={true}
                                    range={this.props.range}
                                    onActorClicked={null} />
                        </div>
                        <p className="mini-director-name">
                            {director.name}
                        </p>
                    </div>
                </Link>
            )
        });
    }

    render() {
        document.body.style.overflowY = 'auto';
        return (
            <div>
                <Header />
                <div className="all-directors-container">
                    { this.createDirectorList() }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    range: state.filmApp.app.range
  };
}

export default connect(mapStateToProps)(Directors);
