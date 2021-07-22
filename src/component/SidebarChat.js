import { Avatar } from '@material-ui/core';
import React from 'react';
import '../styles/sidebarchat.css';
function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Group name</h2>
        <p>this is the last message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
