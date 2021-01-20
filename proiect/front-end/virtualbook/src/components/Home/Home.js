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
            </div>
            <div>
                <p id="paragraph1">Bine ati venit!!!</p>
            </div>
            </div>
        );
    }
}
 
export default Home;