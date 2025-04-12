import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:3333');

export const ChatBox = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );

  useEffect(() => {
    socket.on('chat_history', (msgs) => setMessages(msgs));
    socket.on('new_message', (msg) => setMessages((prev) => [...prev, msg]));

    return () => {
      socket.off('chat_history');
      socket.off('new_message');
    };
  }, []);

  const sendMessage = () => {
    if (username && message) {
      socket.emit('new_message', { user: username, text: message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Real Time Chat</h1>

      <label>
        <FontAwesomeIcon icon={faUser} aria-hidden="true" focusable="false" />
        Username
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={30}
          required
        />
      </label>

      <label>
        Message
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <button onClick={sendMessage} aria-label="Send message">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>

      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.user}</strong>: {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
