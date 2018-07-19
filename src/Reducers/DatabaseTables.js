const DatabaseTables = (state = [], action) => {
    switch (action.type) {
      case 'ADD_DB_Table':
        return [
          ...state,
          {
            id: action.id,
            ...action.table
          }
        ]
      default:
        return state
    }
  }
  
  export default DatabaseTables
  