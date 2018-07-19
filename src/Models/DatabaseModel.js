import api from './api'

const UserModel = {
    GetInfo(){
        return api.getWhitAuth('database_info')
    },
    GetTableData(table){
        return api.getWhitAuth('data_table?t='+table)
    },
    GetTableInfo(table){
        return api.getWhitAuth('table_info?table='+table)
    }
}

export default UserModel