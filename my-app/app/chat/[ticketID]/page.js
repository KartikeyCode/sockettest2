'use client'
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Chat({ params }) {
  const { ticketID } = params;

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (ticketID) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('join', ticketID);
      });

      newSocket.on('chat message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on('chat history', (history) => {
        setMessages(history);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [ticketID]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('chat message', { room: ticketID, message: messageInput });
      setMessageInput('');
    }
  };

  return (
    <div>
      <h1>Chat Room: {ticketID}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
