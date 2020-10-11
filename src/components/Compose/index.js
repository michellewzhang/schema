import React from 'react';
import './Compose.css';

export default class Compose extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = { 
      messages: [],
      id: 0,
      author: 'apple', 
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState(prevState => ({
      messages: [...prevState.messages, 
        {
          id: this.state.id + 1,
          author: this.state.author === 'apple' ? 'orange' : 'apple',
          message: this.state.value,
          timestamp: new Date().getTime(),
        }],
    id: this.state.id + 1,
    author: this.state.author === 'apple' ? 'orange' : 'apple',
    }),
    );
    alert('A name was submitted: ' + this.state.value);
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <div className="compose">
        <form onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input 
            type="text" 
            className="compose-input" 
            placeholder="Type your response..." 
            value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }*/
}