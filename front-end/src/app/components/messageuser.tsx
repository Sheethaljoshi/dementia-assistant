import React, { Fragment, useState } from 'react';

interface Messprops2{
    message: string;
}

const MessUser: React.FC<Messprops2> = ({message}) => {
  return (
  <div>
    <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary">{message}</div>
    </div>
  </div>
  );
};

export default MessUser;
