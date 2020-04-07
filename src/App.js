import React from 'react';
import Form from './Form'
import Item from './Item'
import { Spring } from 'react-spring/renderprops'
const uuidv1 = require('uuid/v1');
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      version: 1.6,
      author: 'Truta Valentin',
      filter: 3,
      msg: '',
      msgVisible: false,
      form: {
        title: '',
        body: '',
        complete: '',
      },
      items: []
    }
    this.doSetFalse = this.doSetFalse.bind(this)
    this.handleNewTask = this.handleNewTask.bind(this)
    this.addTask = this.addTask.bind(this)
    this.delete = this.delete.bind(this)
    this.filterHandler = this.filterHandler.bind(this)
  }
  doSetFalse(id) {
    let newElem = this.state.items.map(item => {
      if (item.id === id) {
        item.complete = !item.complete
        return item
      } else {
        return item
      }
    })
    this.setState({
      items: [...newElem]
    })
  }
  addTask(e) {
    let id = uuidv1()
    e.preventDefault();
    // Check for forms
    if (this.state.form.title === "" || this.state.form.body === "") {
      this.setState({
        msg: "Title and description is required..."
      })
    } else {
      if (this.state.items.filter(task => task.title === this.state.form.title).length === 1) {
        this.setState({
          msg: 'An task with the same title allready exist.'
        })
      } else {
        this.setState({
          msg: "New task to do is added."
        })
        //Set New form if condition is true
        let newItem = {
          title: this.state.form.title,
          complete: false,
          id: id,
          body: this.state.form.body
        }
        this.setState(prevState => ({
          items: [...this.state.items, newItem]
        }))
      }
    }
  }
  componentDidMount() {
    if (!localStorage.getItem('tasks')) {
      this.setState({
        items: [{
          id: [uuidv1()],
          title: 'Lorem',
          body: 'Lorem ipsum dolar',
          complete: true
        }, {
          id: [uuidv1()],
          title: 'Dolar',
          body: 'Dolar sit amet',
          complete: false
        }, {
          id: [uuidv1()],
          title: 'Sit',
          body: 'Lorem sit',
          complete: false
        }, {
          id: [uuidv1()],
          title: 'Curem',
          body: 'Lorem sit',
          complete: false
        }, {
          id: [uuidv1()],
          title: 'Something',
          body: 'Lorem sit',
          complete: false
        }, {
          id: [uuidv1()],
          title: 'Another',
          body: 'Lorem sit',
          complete: false
        }],
      })
    } else {
      console.log('Loaded from local storage');
    }
  }
  filterHandler() {
    if (this.state.filter === 3) {
      this.setState({
        filter: 1
      })
    } else {
      this.setState(prevState => ({
        filter: prevState.filter + 1
      }))
    }
  }
  filter() {
    switch (this.state.filter) {
      case 1:
        return this.state.items.filter(filter => filter.complete === false)
      case 2:
        return this.state.items.filter(filter => filter.complete === true)
      case 3:
        return this.state.items
      default:
        break
    }
  }
  componentWillMount() {
    localStorage.getItem('tasks') && this.setState({
      items: JSON.parse(localStorage.getItem('tasks')),
    })
  }
  handleNewTask(e) {
    this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
  }
  delete(id) {
    let deleteItem = this.state.items.filter(item => item.id !== id)
    this.setState({
      items: deleteItem,
      msg: 'Task was deleted'
    })
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('tasks', JSON.stringify(nextState.items))
    localStorage.setItem('tasks-date', Date.now());
  }
  render() {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ deplay: 1000, duration: 1000 }}
      >
        {props => (
          <div style={props}>
            <div className="App">
              <div className="header">
                <h1>New Task Manager</h1>
                <small>{this.state.version} © {this.state.author}</small>
              </div>
              <div className="wrapper">
                <div className="grid">
                  <div className="Items grid__col grid__col--1-of-2 grid__col--1-of-1">
                    <Item doFilterHandler={this.filterHandler} filter={this.state.filter} onDelete={this.delete} setState={this.doSetFalse} allItems={this.state.items} items={this.filter()} />
                  </div >
                  <div className="form grid__col grid__col--1-of-2 grid__col--1-of-1">
                    <Form doNewTask={this.addTask} onInput={this.handleNewTask} />
                    <div className="msg">
                      {this.state.msg}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default App