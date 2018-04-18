
const initialState = {
  tasks: [{
    id:1, 
    title: 'Default task name',
    status: 'Completed'
  },{
    id:2, 
    title: 'Default task name',
    status: 'Completed'
  }],
  task: {}
}


export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TASKS':
      return {
        state,
      }
    case 'ADD_TASK':
      return {
        ...state,
        task: action.payload
      }
    case 'TOOGLE_STATUS':
      return {
        ...state,

      }
    default:
      return state; 
  }
}