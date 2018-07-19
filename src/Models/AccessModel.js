import api from './api'

const AccessModel = {
    NewAccess(params){
        return api.postWhitAuth('access',params)
    },
}

export default AccessModel