"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  date: string;
  description: string;
  mem_index: number;
}

const Modal3: React.FC<ModalProps> = ({ isVisible, onClose, date, description, mem_index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    setNewName(date);
    setNewDescription(description);
  }, [date, description]);

  const handleUpdateButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewName(date);
    setNewDescription(description);
    onClose()
  };

  const handleSubmit1 = () => {
    const url = `http://127.0.0.1:8000/delete/mem?email=sh33thal24@gmail.com&first_name=Sheethal&last_name=Joshi%20Thomas&mem_index=${mem_index}`;
    axios.post(url);
    onClose();
    window.location.reload();
  };

  const handleSubmit2 = () => {
    const url = `http://127.0.0.1:8000/update/mem?email=sh33thal24@gmail.com&first_name=Sheethal&last_name=Joshi%20Thomas&mem_index=${mem_index}&date=${newName}&description=${newDescription}`;
    axios.post(url);
    onClose();
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-45 backdrop-blur flex justify-center items-center z-50 '>
      <div className=''>
        <div className='bg-base-200 p-7 rounded-3xl flex flex-col overflow-auto '>
          <div className='mb-7 mt-2 text-lg flex'>
            <div className='flex'>
              <div className=' mt-10'>
                <div className='flex mb-4 justify-between'>
                  <div className='flex'>
                    {isEditing ? (
                        <input type="text" className="input input-bordered font-extrabold  text-3xl " placeholder="Daisy" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    ) : (
                      <div className='font-extrabold text-3xl'>{date}</div>
                    )}
                  </div>
                </div>
                <div className='card bg-base-100 shadow-xl'>
                  <div className='card-body'>
                    {isEditing ? (
                      <textarea className="textarea textarea-bordered card-body h-40 w-96" placeholder="What memory would you like to share?" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                    ) : (
                      <div className='mt-2 ml-3'>{description}</div>
                    )}
                  </div>
                </div>
                <div className=" flex-col mt-10">
                  {isEditing ? (
                    <>
                      <button className='btn w-64 bg-warning mr-6 mt-4' onClick={handleSubmit2}>Save Changes</button>
                      <button className='btn w-64 bg-error mr-6 mt-4' onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className='btn w-64 bg-warning mr-6 mt-4' onClick={handleUpdateButtonClick}>Update Memory</button>
                      <button className="btn w-64 bg-warning mr-6 mt-4" onClick={handleSubmit1}>Delete Memory</button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="card-actions">
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

export default Modal3;