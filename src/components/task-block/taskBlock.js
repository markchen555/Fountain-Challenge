import React from 'react';

import './taskBlock.css'

const TaskBlock = (props) => {
  let task = props.task;
  return (
    <div key={task.id} className="col-sm-4 card-section">
      <div className="card task-card">
        <div className="card-body">
          <div className="">
            <h5 id={`card-title-${task.id}`} className="card-title" onMouseOver={props.displayShow}>{task.title}</h5>
            {task.status === 'Active' ? 
              <p className="card-text grey">{task.status}</p> :
              <p className="card-text green">{task.status}</p>
            }
          </div>
          <div id={`control-bar-${task.id}`} onMouseLeave={props.displayHidden} className="hidden overlay-control-bar">
            {task.status === 'Active' ? 
              <button name={task.id} className="btn btn-primary btn-complete col-5" onClick={props.handleToggle}>Complete</button> : 
              <button name={task.id} className="btn btn-primary btn-undo col-5" onClick={props.handleToggle}>Undo</button>
            }
            <span className="divider col-2"> | </span>
            <button name={task.id} onClick={props.onEdit} className="btn btn-secondary btn-edit col-5">Edit</button>
          </div>
          <div id={task.id} className="edit-input overlay-input-bar">
            <div className="row">
              <input name={task.id} onChange={props.onUserInput} className="task-input col-9" type="text" placeholder='Enter task name...'/>
              <button name={task.id} onClick={props.onEditTask} className="btn btn-primary btn-save col-3">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskBlock;