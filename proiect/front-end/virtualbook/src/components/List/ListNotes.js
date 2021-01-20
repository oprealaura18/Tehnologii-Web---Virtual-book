import React, { Component } from 'react'
import ApiService from "../../services/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class ListNotes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            materii: [],
            message: null,
            shared: [],
            filterExp:''
        }
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.reload = this.reload.bind(this);
        this.filerResult = this.filerResult.bind(this);
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        ApiService.fetchNotes(localStorage.getItem("jwt"))
            .then((res) => {
                this.setState({notes: res.data})
            });

        ApiService.sharedNotes(localStorage.getItem("jwt"))
            .then((res) => {
                this.setState({shared: res.data})
            });
    }



    deleteNote(noteId) {
        ApiService.deleteNote(noteId)
           .then(res => {
               this.setState({message : 'Note deleted successfully.'});
               this.setState({notes: this.state.notes.filter(note => note.id !== noteId)});
               this.props.history.push('/listnote');
           })
    }

    editNote(id) {
        window.localStorage.setItem("noteId", id);
        this.props.history.push('/editoredit');
    }

    addNote() {
        window.localStorage.removeItem("noteId");
        this.props.history.push('/editor');
    }


   filerResult(){
   this.setState({notes: this.state.notes.filter(option => option.label.toLowerCase()
   .includes(this.state.filterExp.toLowerCase()))});
   }

 onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>My Notes</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addNote()}>
                    Add
                </Button>
                <p></p>
                <TextField type="text" label="Search"  margin="normal" name="filterExp"  value={this.state.filterExp} onChange={this.onChange}/>
                <Button variant="contained" color="primary" onClick={() => this.filerResult()}>
                    Search
                </Button>
                <Table  options={{search: true}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Titlu</TableCell>
                            <TableCell>Materie</TableCell>
                            <TableCell>Etichete</TableCell>
                            <TableCell>Editeaza</TableCell>
                            <TableCell>Sterge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.notes.map(row => (
                            <TableRow key={row.idNotita}>
                                <TableCell component="th" scope="row">
                                    {row.idNotita}
                                </TableCell>
                                <TableCell>{row.titlu}</TableCell>
                                <TableCell>{row.idMaterie}</TableCell>
                                <TableCell>{row.label}</TableCell>

                                <TableCell onClick={() => this.editNote(row.idNotita)}><CreateIcon /></TableCell>
                                <TableCell onClick={() => this.deleteNote(row.idNotita)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

        <Typography variant="h4" style={style}>Shared Notes</Typography>

        <Table  options={{search: true}}>
    <TableHead>
        <TableRow>
        <TableCell>Id</TableCell>
        <TableCell>Titlu</TableCell>
        <TableCell>Materie</TableCell>
            <TableCell>Etichete</TableCell>
            <TableCell>Editeaza</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.state.shared.map(row => (
                <TableRow key={row.idNotita}>
                <TableCell component="th" scope="row">
                       {row.idNotita}
                </TableCell>
                <TableCell>{row.titlu}</TableCell>
                <TableCell>{row.idMaterie}</TableCell>
                <TableCell>{row.label}</TableCell>

                <TableCell onClick={() => this.editNote(row.idNotita)}><CreateIcon /></TableCell>
        </TableRow>
    ))}
    </TableBody>

        </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListNotes;