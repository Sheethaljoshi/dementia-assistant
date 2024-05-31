import React, { useState } from 'react';
import { RiHeartAdd2Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import { FcAssistant } from "react-icons/fc";
import MessUser from './messageuser';
import MessAssi from './messageassi';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}



const Modalchat: React.FC<ModalProps> = ({ isVisible, onClose}) => {

    const messages = [
        { id: 1, role: "user", message: "Hi there!" },
        { id: 2, role: "assistant", message: "Hello! I'm here to help. What do you need?" },
        { id: 3, role: "user", message: "I'm having trouble with my computer. It keeps freezing." },
        { id: 4, role: "assistant", message: "That sounds frustrating. Let's see if we can troubleshoot the issue." },
        { id: 5, role: "user", message: "I've tried restarting it, but it's still not working." },
        { id: 6, role: "assistant", message: "Have you checked for any recent software updates?" },
        { id: 7, role: "user", message: "No, I haven't. I'll give that a try." }
    ];
    
    
if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-45 backdrop-blur flex justify-center items-center z-50'>
      <div className='w-[600px]'>
        <div className='bg-base-200 p-7 rounded-3xl flex flex-col'>
          <div className='mb-7 mt-2 text-lg flex justify-between'>
            <div className='flex'><div className='mr-2'>
              <IconContext.Provider value={{ size: 40 }}>
                <div className=''>
                <FcAssistant />
                </div>
              </IconContext.Provider>
            </div>
            <div className='font-extrabold mt-2 text-2xl'>Your Personal Assistant</div>
            <button className="btn w-64 bg-warning mr-6 mt-4">Reset Chat</button>
            </div>
            <div className="card-actions justify-end">
                <button className="btn btn-square btn-sm" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                </div>
          </div>
          <div className="card w-full bg-base-100 h-80 ">
            <div className="card-body overflow-y-auto">
            {messages.map((mess) => (
                    mess.role === "assistant" ? 
                        <MessAssi key={mess.id} {...mess} /> :
                        <MessUser key={mess.id} {...mess} />
                ))}
            </div>
            </div>
            <div className="join w-full bg-base-100 shadow-2xl mt-8">
                <input className="card w-full bg-base-100 pl-5 input-bordered input join-item" placeholder="Enter message"/>
                <button className="btn join-item rounded-r-full bg-warning input-bordered">Send</button>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Modalchat;
