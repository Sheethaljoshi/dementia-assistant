import React, { useState } from 'react';
import { RiHeartAdd2Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import axios from 'axios';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  name: string;
  description:string;
  relation: string;
  occupation: string;
  person_index: number;

}

const Modal1: React.FC<ModalProps> = ({ isVisible, onClose, name, description, relation, occupation, person_index}) => {

  const handleSubmit = () => {
      const url = `http://127.0.0.1:8000/delete/person?email=sh33thal24@gmail.com&first_name=Sheethal&last_name=Joshi%20Thomas&person_index=${person_index}`;
      axios.post(url)
    onClose()
    window.location.reload();
  }


  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-45 backdrop-blur flex justify-center items-center z-50 '>
    <div className='w-[1000px]'>
      <div className='bg-base-200 p-7 rounded-3xl flex flex-col'>
        <div className='mb-7 mt-2 text-lg flex justify-between'>
          <div className='flex'><div className='mr-2'>
          <div className="avatar flex-col mt-10">
            <div className=" w-60 rounded-xl">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
            <button className="btn w-64 bg-warning mr-6 mt-4">Update Person</button>
            <button className="btn w-64 bg-warning mr-6 mt-4" onClick={handleSubmit}>Delete Person</button>
          </div>
          </div><div className=' mt-10'>
          <div className='flex mb-4 justify-between'>
            <div className='flex'><div className='font-extrabold text-3xl'>{name}</div>
          <div className=' mt-2 ml-3 mr-12  text-xl'>{relation}</div></div>
          <div className=' mt-4 text-sm'>{occupation}</div>
          </div>
          <div className="card w-full bg-base-100 shadow-xl h-80">
          <div className="card-body overflow-y-auto">
          <div className='mt-2 ml-3'>{description}</div>
          </div>
          </div>
          </div>
          </div>
          <div className="card-actions justify-end">
              <button className="btn btn-square btn-sm" onClick={onClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Modal1;
