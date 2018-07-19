import { combineReducers } from 'redux'
import DatabaseTables from './DatabaseTables'
import Databases from './DataBases'

export default combineReducers({
    Databases,
    DatabaseTables,
})
