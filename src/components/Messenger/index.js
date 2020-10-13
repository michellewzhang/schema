import MessageList from '../MessageList';
import './Messenger.css';
import React from 'react';

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: 0,
          author: 'apple',
          message: 'Hello! How are you today?',
          timestamp: new Date().getTime(),
        }
      ],
      id: 1,
      author: 'apple',
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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
    this.setState({ value: '' });
    event.preventDefault();
  }

  render() {
    return (
      <div className="messenger">
        <div className="compose">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="compose-input"
                  placeholder="Type your response..."
                  value={this.state.value} onChange={this.handleChange} />
              </form>
            </div>

            <div className="message-list">
              <MessageList messageList={this.state.messages} />
            </div>
        </div>
    );
  }
}