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

class ListGroup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            groups: [],
            message: null
        }
        this.deleteGroup = this.deleteGroup.bind(this);
        this.editGroup = this.editGroup.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this.reload();
    }

    reload() {
        ApiService.fetchGroups(localStorage.getItem("jwt"))
            .then((res) => {
                this.setState({groups: res.data})
            });
    }



    deleteGroup(noteId) {
        ApiService.deleteGroup(noteId)
           .then(res => {
               this.setState({message : 'Group deleted successfully.'});
               this.props.history.push('/group');
           })
    }

    editGroup(id) {
        window.localStorage.setItem("groupId", id);
        this.props.history.push('/editoredit');
    }

    addGroup() {
        window.localStorage.removeItem("groupId");
        this.props.history.push('/addgroup');
    }


//    filerResult(){
//    this.setState({notes: this.state.notes.filter(option => option.label.toLowerCase()
//    .includes(this.state.filterExp.toLowerCase()))});
//    }

 onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addGroup()}>
                    Add
                </Button>
                <p></p>

                <Table  options={{search: true}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nume</TableCell>
                            <TableCell>Useri</TableCell>
                            
                            <TableCell>Notita</TableCell>

                            <TableCell>{'Editeaza'}</TableCell>
                            <TableCell>{'Sterge'}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.groups.map(row => (
                            <TableRow key={row.idGroup}>
                                <TableCell component="th" scope="row">
                                    {row.idGroup}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.login}</TableCell>
                                <TableCell>{row.notes}</TableCell>
                                
                                <TableCell  onClick={() => this.editGroup(row.idGroup)}><CreateIcon /></TableCell>
                                <TableCell  onClick={() => this.deleteGroup(row.idGroup)}><DeleteIcon /></TableCell>

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

export default ListGroup;