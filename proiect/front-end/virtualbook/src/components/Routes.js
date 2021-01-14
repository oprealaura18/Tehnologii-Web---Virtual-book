import React, { Component } from 'react';
import App from '../App';
import Home from './Home/Home';
import LogIn from './LogIn/LogIn';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/home" exact component={Home} />
                    <Route path="/LogIn" component={LogIn} />
                </Switch>
            </Router>
        )
    }
}