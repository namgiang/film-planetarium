import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Main.css';
import Header from '../components/Header/Header';
import About from './About/About';
import Directors from './Directors/Directors';
import Director from './Director/Director';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <React.Fragment>
            <Header />
            <div className="main">
                <Switch>
                    <Route exact path="/" component={Directors} />
                    <Route path="/directors" component={Directors} />
                    <Route path="/about" component={About} />
                    <Route path="/director/:directorLabel" exact component={Director} />
                </Switch>
            </div>
        </React.Fragment>
        )
    }
}

export default Main;