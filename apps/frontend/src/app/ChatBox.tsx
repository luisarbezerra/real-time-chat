import { useEffect, useState } from 'react';
import io from 'socket.io-client';

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
      <input
        placeholder="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

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
