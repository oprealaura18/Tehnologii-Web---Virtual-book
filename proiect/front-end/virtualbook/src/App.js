
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import LogIn from './components/LogIn/LogIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
//import Navbar from './components/Navbar';
//import Footer from './components/pages/Footer.js/Footer';

function App() {
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path='/home' component={Home}/>
      <Route path='/LogIn' component={LogIn}/>
    </Switch>
    
  </Router>
  );
}

export default App;
