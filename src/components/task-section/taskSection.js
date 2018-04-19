import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTasks, addTask } from '../../actions/postAction';

import Loading from '../loading/loading';
import TaskBlock from '../task-block/taskBlock';

import './taskSection.css';

class TaskSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskTitle: '',
      allCompleted: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
    this.displayShow = this.displayShow.bind(this);
    this.displayHidden = this.displayHidden.bind(this);
  }

  componentWillReceiveProps(nextTasks) {
    this.setState({tasks: nextTasks.tasks}, console.log("setting state", this.state.tasks));
  }

  onAddTask() {
    this.props.addTask({id: this.props.tasks.length, title: 'Default task name', status: 'Active'});
  }

  displayShow(e) {
    let currTaskId = e.target.id.split('-')[2];
    let currTask = `control-bar-${currTaskId}`
    let element = document.getElementById(currTask).classList.add("show")
  }

  displayHidden(e) {
    let currTaskId = e.target.id.split('-')[2];
    console.log(e.target)
    let currTask = `control-bar-${currTaskId}`
    let element = document.getElementById(currTask).classList.remove("show")
  }

  onEdit(e) {
    let currTask = e.target.name;
    let element = document.getElementById(currTask).classList.add("show")
  }

  onEditTask(e) {
    e.preventDefault();
    this.state.tasks[e.target.name].title = this.state[e.target.name]
    this.setState({tasks: this.state.tasks});
    let currTask = e.target.name;
    let element = document.getElementById(currTask).classList.remove("show")
  }

  handleClick(e) {
    e.preventDefault();
    this.onAddTask();
  }

  handleToggle(e) {
    this.state.tasks[e.target.name].status = this.state.tasks[e.target.name].status === "Completed" ? "Active" : "Completed"
    this.setState({tasks: this.state.tasks});
  }

  onUserInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    if(!this.state.tasks) {
      return (<Loading />)
    } 

    const mapTasks = this.props.tasks.map((task, i) => {
      return <TaskBlock key={i} handleToggle={this.handleToggle} onEdit={this.onEdit} onUserInput={this.onUserInput} onEditTask={this.onEditTask} displayShow={this.displayShow} displayHidden={this.displayHidden} task={task}/>
    })

    const taskStatus = this.props.tasks.every(task => {
      return task.status === 'Completed' ? this.state.allCompleted = true : this.state.allCompleted = false;
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
})

const mapDispatchToProps = dispatch => ({
  addTask: bindActionCreators(addTask, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskSection);