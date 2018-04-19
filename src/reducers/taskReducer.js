
const initialState = {
  tasks: [],
}


export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      // console.log('this is tasks', state.tasks);
      // console.log('this is action.payload', action.payload);
      state.tasks = [...state.tasks, action.payload];
      return {...state};
    default:
      return state; 
  }
}