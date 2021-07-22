import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './component/Chat';
import SideBar from './component/SideBar';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('78289be55f1a5ba3062b', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      setMessages([...messages, data]);
    });

    return () => {
      pusher.unsubscribe();
      pusher.unbind_all();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
