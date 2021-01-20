import React, { Component } from 'react';

import ApiService from "../../services/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';


class Group extends Component {

  constructor(props){
          super(props);
          this.state ={
              name: '',
              idLogin: '',
              selectedLogin: [],
              selectedNote: [],
              idNote: '',
              notes: [],
              login: []
          }
          this.saveGroup = this.saveGroup.bind(this);
          this.loadLogin = this.loadLogin.bind(this);
          this.loadNote = this.loadNote.bind(this);
      }

    componentDidMount() {
        this.loadLogin();
        this.loadNote();

    }

    loadLogin() {
        ApiService.fetchLogin()
            .then((res) => {
                this.setState({login: res.data})
            });
    }

    loadNote() {
             ApiService.fetchNotes(localStorage.getItem("jwt"))
                .then((res) => {
                    this.setState({notes: res.data})
                });
        }


      saveGroup = (e) => {
          e.preventDefault();
          let doc = {name: this.state.name, notes: this.state.selectedNote , login: this.state.selectedLogin};
          ApiService.addGroup(doc)
              .then(res => {
                  this.setState({message : 'User added successfully.'});
                  this.props.history.push('/group');
              });
      }

    handleChangeIdLogin = (e) => {
    this.setState({ idLogin: e.target.value , selectedLogin: this.state.selectedLogin.concat([e.target.value])});

    }


       handleChangeIdNote = (e) => {
       this.setState({ idNote: e.target.value , selectedNote: this.state.selectedNote.concat([e.target.value])});

       }


      onChange = (e) =>
          this.setState({ [e.target.name]: e.target.value });

      render() {
          return(
              <div>
                  <Typography variant="h4" style={style}>Add</Typography>
                  <form style={formContainer}>

                      <TextField type="text" label="Nume" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>

                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={this.state.idLogin}
                             onChange={this.handleChangeIdLogin}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {this.state.login.map(row => (<MenuItem value={row.email}>{row.email}</MenuItem>))}
                            </Select>

                           <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={this.state.idNote}
                             onChange={this.handleChangeIdNote}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {this.state.notes.map(row => (<MenuItem value={row.titlu}>{row.titlu}</MenuItem>))}
                            </Select>
                      <Button variant="contained" color="primary" onClick={this.saveGroup}>Save</Button>
              </form>
      </div>
          );
      }
}
  const formContainer = {
      display: 'flex',
      flexFlow: 'row wrap'
  };

  const style ={
      display: 'flex',
      justifyContent: 'center'

  }


export default Group;