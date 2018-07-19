import api from './api'
import base64 from 'base-64';

function basicAuth(user, password) {
    var tok = user + ':' + password;
    var hash =base64.encode(tok);
    return "Basic " + hash;
}

const UserModel = {
    Auth(user, pass){
        let token = basicAuth(user,pass)
        return api.getWhitAuth("users/me", token)
    },
    AddUser(userData){
        console.log(userData)
        return api.postWhitAuth("users", userData)
    },
    UpdateUser(){
        //
    },
    DeleteUser(){
        //
    }
}

export default UserModel