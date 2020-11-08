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
          author: 'system',
          message: 'Hello! Welcome to dialog builder.',
        }
      ],
      id: 0,
      author: 'system',
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
        author: this.state.author === 'system' ? 'user' : 'system',
        message: this.state.value,
      }],
      id: this.state.id + 1,
      author: this.state.author === 'system' ? 'user' : 'system',
    }),
    );
    this.setState({ value: '' });
    event.preventDefault();
  }

  render() {
    const schemaTitle = this.props.title;
    console.log(this.state.messages);

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
          <MessageList messageList={this.state.messages} title={schemaTitle} />
        </div>
      </div>
    );
  }
}