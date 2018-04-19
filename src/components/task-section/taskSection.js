import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTasks, addTask } from '../../actions/postAction';

import Loading from '../loading/loading';
import TaskBlock from './taskBlock';

import './taskSection.css';

class TaskSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      allCompleted: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
  }

  componentWillReceiveProps(nextTasks) {
    this.setState({tasks: nextTasks.tasks}, console.log("setting state", this.state.tasks));
  }

  onAddTask() {
    // this.setState({task: {id: this.props.tasks.length, title: 'Default task name', status: 'Active'}},
    // this.props.addTask(this.state.task));
    this.props.addTask({id: this.props.tasks.length, title: 'Default task name', status: 'Active'});
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
      return <TaskBlock key={i} handleToggle={this.handleToggle} task={task}/>
    })

    const taskStatus = this.props.tasks.every(task => {
      return task.status === 'Completed' ? this.state.allCompleted = true : this.state.allCompleted = false
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
  // fetchTasks: bindActionCreators(fetchTasks, dispatch),
  addTask: bindActionCreators(addTask, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskSection);