

export const fetchTasks = () => dispatch => {
  console.log('action called')
  type: 'FETCH_TASKS'
}

export const addTask = (taskData) => dispatch => {
  dispatch({
    type: 'ADD_TASK',
    payload: taskData
  })
}

export const toggleStatus = (status) => dispatch => {
  let currStatus = status === 'Active' ? status = 'Completed' : status = 'Active';
  dispatch({
    type: 'TOGGLE_STATUS',
    payload: currStatus
  })
}