import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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
    this.onInputEdit = this.onInputEdit.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
    this.displayShow = this.displayShow.bind(this);
  }

  componentWillReceiveProps(nextTasks) {
    this.setState({tasks: nextTasks.tasks}, console.log("setting state", this.state.tasks));
  }

  onAddTask() {
    this.props.addTask({id: this.props.tasks.length, title: 'Default task name', status: 'Active'});
  }

  displayShow(id) {
    let innerDisplayShow = () => {
      let currTask = `control-bar-${id}`
      let element = document.getElementById(currTask).classList.toggle("show")
    }
    return innerDisplayShow.bind(this);
  }

  onEditTask(e) {
    let editName = `control-input-${e.target.name}`;
    let element = document.getElementById(editName).classList.add("show");
  }

  onInputEdit(e) {
    e.preventDefault();
    if(this.state[e.target.name] !== undefined) {
      let input = this.state[e.target.name].trim();
      let name = input.length === 0 ? 'Default task name' : input;
      this.state.tasks[e.target.name].title = input;
      this.setState({tasks: this.state.tasks});
    }
    let currTask = `control-input-${e.target.name}`;
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
      return <TaskBlock key={i} handleToggle={this.handleToggle} onEditTask={this.onEditTask} onUserInput={this.onUserInput} onInputEdit={this.onInputEdit} displayShow={this.displayShow(i)} task={task}/>
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
              <span className="task-status-text">All tasks completed</span>
            </div>
            <div className="col-md-12 task-status-count">
              <span>Well done!</span>
            </div>
          </div>
        </div> 
        :
        <div className="task-status-active">
          <div className="row">
            <div className="col-md-12">
              <span className="task-status-text">Complete all tasks</span>
            </div>
            <div className="col-md-12 task-status-count">
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

TaskSection.propTypes = {
  tasks: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSection);