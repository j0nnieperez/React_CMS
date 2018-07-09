import api from './api'
import base64 from 'base-64';

function basicAuth(user, password) {
    var tok = user + ':' + password;
    var hash =base64.encode(tok);
    return "Basic " + hash;
}

const UserModel = {
    Auth(user, pass){
        console.log(user)
        console.log(pass)
        let token = basicAuth(user,pass)
        console.log(token)
        return api.getWhitAuth("users/me", token)
    }
}

export default UserModel