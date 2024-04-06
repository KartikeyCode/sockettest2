"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [room, setRoom] = useState('Gamer');

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('join', room);
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
  }, [room]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('chat message', { room, message: messageInput });
      setMessageInput('');
    }
  };

  return (
    <div>
      <h1>Chat Room: {room}</h1>
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
