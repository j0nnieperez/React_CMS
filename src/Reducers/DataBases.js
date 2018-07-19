const Databases = (state = [], action) => {
    switch (action.type) {
      case 'ADD_Database':
        return [
          ...state,
          {
            id: action.id,
            name: action.database
          }
        ]
      default:
        return state
    }
  }
  
  export default Databases
  