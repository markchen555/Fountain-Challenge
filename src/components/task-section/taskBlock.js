import React from 'react';

const TaskBlock = (props) => {
  let task = props.task;
  return (
    <div key={task.id} className="col-sm-4 card-section">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">{task.title}</h6>
          <p className="card-text">{task.status}</p>
          {task.status === 'Active' ? 
          <button name={task.id} className="btn btn-primary" onClick={props.handleToggle}>Complete</button> : 
          <button name={task.id} className="btn btn-primary" onClick={props.handleToggle}>Undo</button>}
          <span> | </span>
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>
    </div>
  )
}

export default TaskBlock;