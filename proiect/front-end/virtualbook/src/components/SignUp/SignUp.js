import React, { Component } from 'react';

import ApiService from "../../services/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class SignUp extends Component {

  constructor(props){
          super(props);
          this.state ={
              nume: '',
              prenume: '',
              univeritati: [],
              email: '',
              dataNasterii: '',
              parola: '',
              idFacultate: ''
          }
          this.saveUser = this.saveUser.bind(this);
          this.loadUniversitati = this.loadUniversitati.bind(this);
      }

    componentDidMount() {
        this.loadUniversitati();
    }

    loadUniversitati() {
        ApiService.fetchUniversitati()
            .then((res) => {
                this.setState({univeritati: res.data})
            });
    }

      saveUser = (e) => {
          e.preventDefault();
          let doc = {nume: this.state.nume, parola: this.state.parola , prenume: this.state.prenume, email: this.state.email,
             idFacultate: this.state.idFacultate, dataNasterii: this.state.dataNasterii};
          ApiService.addUser(doc)
              .then(res => {
                  this.setState({message : 'User added successfully.'});
                  this.props.history.push('/login');
              });
      }

    handleChange = (e) =>
        this.setState({ idFacultate: e.target.value });

      onChange = (e) =>
          this.setState({ [e.target.name]: e.target.value });

      render() {
          return(
              <div>
                  <Typography variant="h4" style={style}>Add</Typography>
                  <form style={formContainer}>

                      <TextField type="text" label="Nume" fullWidth margin="normal" name="nume" value={this.state.nume} onChange={this.onChange}/>

                      <TextField type="text" label="Prenume" fullWidth margin="normal" name="prenume" value={this.state.prenume} onChange={this.onChange}/>

                      <TextField type="password" label="Parola" fullWidth margin="normal" name="parola" value={this.state.parola} onChange={this.onChange}/>

                      <TextField type="text" label="Email" fullWidth margin="normal" name="email" value={this.state.email} onChange={this.onChange}/>

                      <TextField type="date" label="Data Nasterii" fullWidth margin="normal" name="dataNasterii" value={this.state.dataNasterii} onChange={this.onChange}/>

                      <Select
                         labelId="demo-simple-select-helper-label"
                         id="demo-simple-select-helper"
                         value={this.state.idFacultate}
                         onChange={this.handleChange} >
                      <MenuItem value="">
                      <em>None</em>
                      </MenuItem>
                       {this.state.univeritati.map(row => (<MenuItem value={row.idFacultate}>{row.numeFacultate}</MenuItem>))}
                        </Select>

                      <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
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


export default SignUp;