import { Message as MessageType } from '@real-time-chat/shared';
import DOMPurify from 'dompurify';
import React from 'react';

import { formatTime } from './utils/formatTime';

type MessageProps = {
  message: MessageType;
  isSentByCurrentUser: boolean;
};

export const Message = ({
  message,
  isSentByCurrentUser,
}: MessageProps): React.ReactElement => {
  const sanitizedText = DOMPurify.sanitize(message.text);
  const sanitizedUsername = DOMPurify.sanitize(message.user.name);

  return (
    <div className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <div
        className="message-content"
        dangerouslySetInnerHTML={{ __html: sanitizedText }}
      />
      <div className="message-timestamp">
        {sanitizedUsername}, {formatTime(new Date(message.timestamp))}
      </div>
    </div>
  );
};
