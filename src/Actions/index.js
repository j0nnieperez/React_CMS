let nextTableId = 0

export const addTable = table => ({
  type: 'ADD_DB_Table',
  id: nextTableId++,
  table
})

export const addDatabase = database => ({
  type: 'ADD_Database',
  id: database.id,
  database: database.name
})
