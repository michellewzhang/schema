/* Copyright Carnegie Mellon University 2020 Michelle Zhang. */

import MessageList from '../MessageList/MessageList';
import './Messenger.css';
import React from 'react';

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      id: 0,
      userID: this.props.userID,
      author: this.props.userID,
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.saveClicked) {
      this.setState({ messages: [] });
      this.props.clickDone();
    }
  }

  clearMessages = () => {
    this.setState({ messages: [] })
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var that = this;
    var request = new XMLHttpRequest();
    var data = { 
      messages: [...this.state.messages, 
        { id: this.state.id + 1, 
          author: this.state.userID, 
          message: this.state.value  } ],
      userID: this.state.userID 
    };
    console.log(data);
    console.log(this.state.messages);
    request.open('POST', 'http://shikib.sp.cs.cmu.edu:8899/reply', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = function () {
      console.log(request.responseText);
      that.setState(prevState => ({
        messages: [...prevState.messages,
        {
          id: that.state.id + 1,
          author: that.state.userID,
          message: that.state.value,
        },
        {
          id: that.state.id + 1,
          author: 'system',
          message: request.responseText,
        }],
        id: that.state.id + 2,
        author: 'system',
      }),
      );
      that.setState({ value: '' });
    };
    request.send(JSON.stringify(data));
  }

  render() {
    const schemaTitle = this.props.title;

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
          <MessageList messageList={this.state.messages} title={schemaTitle} userID={this.state.userID}
            clearMessages={this.clearMessages} />
        </div>
      </div>
    );
  }
}