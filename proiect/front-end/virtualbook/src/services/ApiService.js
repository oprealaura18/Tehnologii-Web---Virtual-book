import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
axios.defaults.headers.common['jwt-token'] = localStorage.getItem("jwt");

class ApiService {

    addUser(user) {
        return axios.post(API_BASE_URL + "/login", user);
    }

     addGroup(group) {
         return axios.post(API_BASE_URL + "/group", group);
     }


    sendUser(user){
        return axios.post(API_BASE_URL + "/auth",user);
    }

    saveNote(note) {
     return axios.post(API_BASE_URL + "/notes",note);
    }

    fetchNotes(userId) {
     return axios.get(API_BASE_URL + "/notesuser/" + userId);
    }

    sharedNotes(userId) {
        return axios.get(API_BASE_URL + "/groupuser/" + userId);
    }

    deleteNote(noteId) {
     return axios.delete(API_BASE_URL + "/notes/" + noteId);
    }

    fetchMaterii() {
       return axios.get(API_BASE_URL + "/subjects");
    }

    deleteGroup(groupId) {
     return axios.delete(API_BASE_URL + "/group/" + groupId);
    }

    fetchUniversitati() {
        return axios.get(API_BASE_URL + "/universities");
    }

    fetchNoteById(noteId) {
        return axios.get(API_BASE_URL + "/notes/" + noteId);
    }

    fetchLogin() {
     return axios.get(API_BASE_URL + "/logins");
     }

     fetchGroups() {
          return axios.get(API_BASE_URL + "/group");
     }

    updateNote(doc) {
        return axios.put(API_BASE_URL + "/notes" + "/" + doc.idNotita);
    }
}

export default new ApiService();