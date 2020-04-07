import React from 'react'
class Form extends React.Component {
  render() {
    return (
      <React.Fragment>
      <h2>New task</h2>
      <form>
        <input onChange={(e) => this.props.onInput(e)} type="text" name="title" placeholder="Task title"/>
        <textarea onChange={(e) => this.props.onInput(e)} type="textarea" name="body" placeholder="Your task description"/>
        <button onClick={this.props.doNewTask}>Add task</button>
      </form>
      </React.Fragment>
    )
  }
}
export default Form