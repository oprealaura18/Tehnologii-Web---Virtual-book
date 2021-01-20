import React, {useState, useRef} from 'react';
import { Component } from 'react';
import JoditEditor from "jodit-react";
import ApiService from "../../services/ApiService";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

class TextEditorEdit extends Component {

  constructor(props) {
        super(props);
        this.state = {
        	content: '',
        	idMaterie: '',
            idNotita: '',
            idLogin: '',
        	titlu: '',
        	label: '',
        	materii: []
        }
        this.save = this.save.bind(this);
        this.loadMaterii = this.loadMaterii.bind(this);
    }

   onChange = (e) =>
          this.setState({ [e.target.name]: e.target.value });


   handleChange = (e) =>
          this.setState({ idMaterie: e.target.value });

    componentDidMount() {
        this.loadMaterii();
        this.loadText();
    }


    loadText() {
        ApiService.fetchNoteById(window.localStorage.getItem("noteId"))
            .then((res) => {
                let doc = res.data;
                this.setState({
                    content: doc.continut,
                    idMaterie: doc.idMaterie,
                    titlu: doc.titlu,
                    label: doc.label,
                    idNotita: doc.idNotita,
                    idLogin: doc.idLogin
                })
            });
    }

    loadMaterii() {
     ApiService.fetchMaterii()
            .then((res) => {
                this.setState({materii: res.data})
            });
    }

    updateContent = (value) => {
        this.setState({content:value})
    }

     save = (e) => {
              e.preventDefault();
              let doc = {continut: this.state.content, idMaterie: this.state.idMaterie, titlu: this.state.titlu, label: this.state.label, idNotita: this.state.idNotita,  idLogin:  localStorage.getItem("jwt")  };
              ApiService.updateNote(doc)
                  .then(res => {
                      this.setState({message : 'Note added successfully.'});
                      this.props.history.push('/home');
                  });
          }

    /**
     * @property Jodit jodit instance of native Jodit
     */
	jodit;
	setRef = jodit => this.jodit = jodit;

	config = {
		readonly: false,
toolbarButtonSize: 'large',
                  uploader: {
                    url: '/manage/upload',
                    insertImageAsBase64URI: false,
                    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
                    //headers: {"token":`${db.token}`},
                    filesVariableName: function (t) {
                      return 'files[' + t + ']';
                    }, //"files",
                    withCredentials: false,
                    pathVariableName: 'path',
                    format: 'json',
                    method: 'POST',
                    prepareData: function (formdata) {
                      return formdata;
                    },
                    isSuccess: function (e) {
                      debugger;
                      return e.success;
                    },
                    getMessage: function (e) {
                      return void 0 !== e.data.messages && Array.isArray(e.data.messages)
                        ? e.data.messages.join('')
                        : '';
                    },
                    process: function (resp: any) { //success callback transfrom data to defaultHandlerSuccess use.it's up to you.
                      let files = [];
                      files.unshift(resp.data);
                      return {
                        files: resp.data,
                        error: resp.msg,
                        msg: resp.msg,
                      };
                    }
                  },

	}
    render() {
        return (
        <div>
         <Select
           labelId="demo-simple-select-helper-label"
           id="demo-simple-select-helper"
           value={this.state.idMaterie}
          onChange={this.handleChange}
         >
           <MenuItem value="">
             <em>None</em>
           </MenuItem>
           {this.state.materii.map(row => (<MenuItem value={row.idMaterie}>{row.numeMaterie}</MenuItem>))}
         </Select>
        <TextField type="text" label="Titlu" fullWidth margin="normal" name="titlu" value={this.state.titlu} onChange={this.onChange}/>
         <TextField type="text" label="Label" fullWidth margin="normal" name="label" value={this.state.label} onChange={this.onChange}/>
        <Button variant="contained" color="primary" onClick={this.save}>Save</Button>
            <JoditEditor
            	editorRef={this.setRef}
                value={this.state.content}
                config={this.config}
                onChange={this.updateContent}
            />

          </div>
        );
    }
}

export default TextEditorEdit;