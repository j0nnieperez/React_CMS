const production = false
const urlApiProduction = 'http://35.229.36.127/'
const urlApiTest = 'http://192.168.1.79:81/api/'
const baseUrl = production ? urlApiProduction : urlApiTest
const version = '0.0.1'

const validateStatus = async request => {
    //console.log(request)
    if(request.status === 200){ 
        const data = await request.json();
        //console.log(data)
        return data;
    }else if(request.status === 401){
        return {
            "success":false,
            "message":"Correo o contraseña invalidos"
        }
    } else if(request.status === 500) {
        return {
            "success":false,
            "message":"No se ha podido realizar la operacion, intenta mas tarde"
        }
    }
}

const api = {
    async getWhitAuth(endpoint, token) {
        let featchURL = `${baseUrl}${endpoint}`;
        let auth = null;
        if (token === undefined) {
            try{
                //auth = await AsyncStorage.getItem('@auth:key');
            } catch (e) {
                console.log(e);
            }
        } else {
            auth = token;
        }
        if(featchURL.indexOf("?") !== -1){
            featchURL += "&v=" + version;
        } else {
            featchURL += "?v=" + version;
        }
        const request = await fetch(featchURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth,
            },
        });
        return validateStatus(request)
    },
    async get(endpoint){
        if(endpoint.indexOf("?") !== -1){
            endpoint += "&v=" + version;
        } else {
            endpoint += "?v=" + version;
        }
        const request = await fetch(baseUrl+endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return validateStatus(request)
    },
    async postWhitAuth(endpoint, params) {
        let auth = null;
        //auth = await AsyncStorage.getItem('@auth:key');
        //params.v = version;
        const request = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                "Authorization": auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        return validateStatus(request)
    },
    async post(endpoint, Data) {
        let endpointFetch;
        Data.v = version;
        const request = await fetch(endpointFetch, {
            method: 'POST',
            enctype:"multipart/form-data",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data)
        });
        return validateStatus(request)
    },
    async delete(endpoint){
        console.log(`${baseUrl}${endpoint}`);
        let auth = null
        try{
            //auth = await AsyncStorage.getItem('@auth:key');
        } catch(error) {
            console.log(error);
        }
        if(endpoint.indexOf("?") !== -1){
            endpoint += "&v=" + version;
        } else {
            endpoint += "?v=" + version;
        }
        const request = await fetch(`${baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                "Authorization": auth,
                'Content-Type': 'application/json',
            },
       });
       return validateStatus(request)
    },
    async update(endpoint, requestUpdate){
        console.log(`${baseUrl}${endpoint}`);
        let auth = null
        try{
            //auth = await AsyncStorage.getItem('@auth:key');
        } catch(error) {
            console.log(error);
        }
        console.log(requestUpdate);
        requestUpdate.v = version;
        const request = await fetch(`${baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                "Authorization": auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestUpdate)
       });
       return validateStatus(request)
    }
};

export default api;