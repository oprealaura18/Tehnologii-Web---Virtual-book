import React from 'react';
import './App.css';
import Routes from "./components/Routes";
import NavBar from "./components/Navbar/Navbar";
import Container from '@material-ui/core/Container';

function App() {
    return (
        <div>
            <NavBar/>
            <Container>
                <Routes/>
            </Container>
        </div>
    );
}

export default App;
