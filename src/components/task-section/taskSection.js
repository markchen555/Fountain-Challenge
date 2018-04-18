import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTasks, addTask } from '../../actions/postAction';

import Loading from '../loading/loading';


import './taskSection.css';

class TaskSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localtask:{},
      allCompleted: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
  }

  componentWillReceiveProps(nextTasks) {
    if(nextTasks.newTask) {
      this.props.tasks.push(nextTasks.newTask);
    }
  }

  onAddTask() {
    this.setState({task: {id: 3, title: 'Default task name', status: 'Active'}});
    this.props.addTask(this.state.task)
  }

  handleClick(e) {
    e.preventDefault();
    console.log("clicked", this.props);
    // this.props.fetchTasks();
    this.onAddTask();
  }

  handleToggle(e) {
    console.log(e.target)
  }

  render() {
    if(!this.props.tasks) {
      return (<Loading />)
    } 
    const mapTasks = this.props.tasks.map(task => {
      return (<div key={task.id} className="col-sm-4 card-section">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.status}</p>
            {task.status === 'Active' ? 
            <button className="btn btn-primary" onClick={this.handleToggle}>Complete</button> : 
            <button className="btn btn-primary" onClick={this.handleToggle}>Undo</button>}
            <span> | </span>
            <button className="btn btn-secondary">Edit</button>
          </div>
        </div>
      </div>)
    })
    const taskStatus = this.props.tasks.map(task => {
      if(task.status === 'Active') {
        this.state.allCompleted = false;
      } else {
        this.state.allCompleted = true;
      }
    })
    return (
      <div className="container task-section">
        <h1>Your tasks</h1>
        {this.state.allCompleted 
        ? 
        <div className="task-status-completed">
          <div className="row">
            <div className="col-md-12">
              <span>All tasks completed</span>
            </div>
            <div className="col-md-12">
              <span>Well done!</span>
            </div>
          </div>
        </div> 
        :
        <div className="task-status-active">
          <div className="row">
            <div className="col-md-12">
              <span>Complete all tasks</span>
            </div>
            <div className="col-md-12">
              <span>You have {this.props.tasks.length} active tasks</span>
            </div>
          </div>
        </div>
      }
        <div className="task-group">
          <div className="row">
          {mapTasks}
            <div  className="col-sm-4">
              <div className="card text-center add-task">
                <div onClick={this.handleClick} className="card-body add-task-section">
                  <h5 className="card-title add-task-title">+ Add Task</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.task.tasks,
  newTask: state.task.task
})

const mapDispatchToProps = dispatch => ({
  fetchTasks: bindActionCreators(fetchTasks, dispatch),
  addTask: bindActionCreators(addTask, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskSection);