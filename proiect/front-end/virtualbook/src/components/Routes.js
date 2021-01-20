import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App';
import Home from './Home/Home';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp'
import TextEditor from './TextEditor/TextEditor'
import TextEditorEdit from './TextEditor/TextEditorEdit'
import ListNotes from './List/ListNotes'
import ListGroup from './List/ListGroup'
import Group from './Group/Group'
import React from "react";

const AppRouter = () => {
    if(localStorage.getItem('jwt')) {
        return (
            <div style={style}>
                <Router>
                    <Switch>
                        <Route path="/login" component={LogIn}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/editor" component={TextEditor}/>
                        <Route path="/editoredit" component={TextEditorEdit}/>
                        <Route path="/listnote" component={ListNotes}/>
                        <Route path="/group" component={ListGroup}/>
                        <Route path="/addgroup" component={Group}/>
                    </Switch>
                </Router>
            </div>
        )
    } else {
        return (
            <div style={style}>
                <Router>
                    <Switch>
                        <Route path="/login" component={LogIn}/>
                        <Route path="/signup" component={SignUp}/>
                    </Switch>
                </Router>
            </div>)
    }
}

const style={
    marginTop:'20px'
}

export default AppRouter;