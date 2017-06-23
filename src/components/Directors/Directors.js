import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Directors.css';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';
import Planet from '../Planet/Planet';

import { DIRECTORS } from '../../data/directors';


class Directors extends Component {
    render() {
        const emptyArray = [];
        const directorDomList = DIRECTORS.map((director, index) => {
            return (
                <Link to={`/director/${director.label}`} >
                    <div className="planets" key={'mini-director-' + director.label}>
                        <div className="planet-container">
                            <Planet director={director}
                                    imageUrls={emptyArray}
                                    actorMovies={emptyArray}
                                    mini={true}
                                    range={this.props.range} />
                        </div>
                        <p className="mini-director-name">
                            {director.name}
                        </p>
                    </div>
                </Link>
            )
        });

        return (
            <div>
                <Header />
                <div className="all-directors-container">
                    { directorDomList }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    range: state.filmApp.movies.range
  };
}

export default connect(mapStateToProps)(Directors);
