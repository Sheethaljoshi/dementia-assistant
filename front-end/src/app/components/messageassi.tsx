import React, { Fragment, useState } from 'react';
import { FcAssistant } from "react-icons/fc";
import { IconContext } from "react-icons";

interface Messprops{
    message: string;
}

const MessAssi: React.FC<Messprops> = ({message}) => {
  return (
  <div className='flex'>
    <IconContext.Provider value={{ size: 30 }}>
                <div className='mt-8'>
                <FcAssistant />
                </div>
              </IconContext.Provider>
    <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary">{message}</div>
    </div>
  </div>
  );
};

export default MessAssi;