
export const addTask = (taskData) => dispatch => {
  dispatch({
    type: 'ADD_TASK',
    payload: taskData
  })
}
