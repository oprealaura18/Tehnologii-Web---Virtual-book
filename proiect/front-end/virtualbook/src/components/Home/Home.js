import React, { Component } from 'react';
import blue from './blue.jpg'
import './Home.css'
class Home extends Component {
    state = {  }
    render() { 
        return (
            <div>
            <div className="background">
                <img src={blue}/>
                <p>Salut</p>
            </div>
            <div>
                <p>Hello</p>
            </div>
            </div>
        );
    }
}
 
export default Home;