import React, { useState } from 'react';
import { RiHeartAdd2Line } from "react-icons/ri";
import { IconContext } from "react-icons";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  name: string;
  description:string;

}

const Modal1: React.FC<ModalProps> = ({ isVisible, onClose, name, description}) => {


  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-45 backdrop-blur flex justify-center items-center z-50'>
      <div className='w-[600px]'>
        <div className='bg-base-200 p-7 rounded-3xl flex flex-col'>
          <div className='mb-7 mt-2 text-lg flex'>
            <div className='mr-2'>
              <IconContext.Provider value={{ size: 23 }}>
                <div>
                  <RiHeartAdd2Line/>
                </div>
              </IconContext.Provider>
            </div>
            {name}
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="card-actions justify-end">
                <button className="btn btn-square btn-sm" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                </div>
                <p>{description}</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
