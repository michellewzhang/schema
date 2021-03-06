/* Copyright Carnegie Mellon University 2020 Michelle Zhang. */

import React, { useEffect, useState } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import Message from '../Message/Message';
import moment from 'moment';
import './MessageList.css';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

export default function MessageList(props) {

  const MY_USER_ID = props.userID;
  const schemaTitle = props.title;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages(props.messageList);
  }, [props.messageList]);

  const getMessages = (list) => {
    var tempMessages = list;
    setMessages(tempMessages);
  }

  const handleRefresh = () => {
    props.clearMessages();
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      if (!(current === [])) {
        tempMessages.push(
          <Message
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
          />
        );
      }


      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  return (
    <div className="message-list">

      <Toolbar
        title={schemaTitle}
        leftItems={<IconButton aria-label="refresh" onClick={handleRefresh}><RefreshIcon /></IconButton>}
      />


      <div className="message-list-container">{renderMessages()}</div>
    </div>
  );
}