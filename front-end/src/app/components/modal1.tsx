import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios'; 

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  name: string;
  description: string;
  relation: string;
  occupation: string;
  person_index: number;
  image_url?: string;
}

const Modal1: React.FC<ModalProps> = ({ isVisible, onClose, name, description, relation, occupation, person_index, image_url }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newOccupation, setNewOccupation] = useState('');
  const [newimage, newsetImage] = useState<File | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      newsetImage(file); // Store the file object
    }
  };

  useEffect(() => {
    setNewName(name);
    setNewDescription(description);
    setNewRelation(relation);
    setNewOccupation(occupation);
    newsetImage(newimage);
  }, [name, description, relation, occupation, newimage]);

  const handleUpdateButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewName(name);
    setNewDescription(description);
    setNewRelation(relation);
    setNewOccupation(occupation);
    newsetImage(newimage);
    onClose()
  };

  const handleSubmit1 = () => {
    const url = `http://127.0.0.1:8000/delete/person?email=sh33thal24@gmail.com&first_name=Sheethal&last_name=Joshi%20Thomas&person_index=${person_index}`;
    axios.post(url);
    onClose();
    window.location.reload();
  };

  const handleSubmit2 = () => {
    let url = '';
    const formData = new FormData();
    formData.append('email', 'sh33thal24@gmail.com');
    formData.append('first_name', 'Sheethal');
    formData.append('last_name', 'Joshi Thomas');

    if (newimage) {
      formData.append('image', newimage); // Add the image file to formData
    }
    url = `http://127.0.0.1:8000/update/person?`;
    formData.append('name', name);
    formData.append('relation', relation);
    formData.append('occupation', occupation);
    formData.append('description', description);
    const response = axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    onClose();
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-45 backdrop-blur flex justify-center items-center z-50 '>
      <div className='lg:w-[1000px] w-96 m-auto'>
        <div className='bg-base-200 p-7 rounded-3xl flex flex-col overflow-auto max-h-[80vh]'>
          <div className='mb-7 mt-2 text-lg flex justify-between'>
            <div className='lg:flex'>
              <div className='mr-2'>
                <div className="avatar flex-col mt-10">
                  <div className=" w-60 rounded-xl">
                  {(image_url) ? <img src={image_url} />: <img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"  />}
                  </div>
                  {isEditing ? (
                    <>
                      <input type="file" className="file-input file-input-primary file-input-bordered w-full max-w-xs mt-3 mb-2" accept="image/*" onChange={handleImageUpload} />
                      <button className='btn w-64 bg-warning mr-6 mt-4' onClick={handleSubmit2}>Save Changes</button>
                      <button className='btn w-64 bg-error mr-6 mt-4' onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className='btn w-64 bg-warning mr-6 mt-4' onClick={handleUpdateButtonClick}>Update Person</button>
                      <button className="btn w-64 bg-warning mr-6 mt-4" onClick={handleSubmit1}>Delete Person</button>
                    </>
                  )}
                </div>
              </div>
              <div className='mt-10'>
                <div className='flex mb-4 justify-between'>
                  <div className='flex-col lg:flex'>
                    {isEditing ? (
                        <input type="text" className="input input-bordered font-extrabold text-3xl w-56 mb-3" placeholder="Daisy" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    ) : (
                      <div className='font-extrabold text-3xl'>{name}</div>
                    )}
                    {isEditing ? (
                      <div className="input-xs">
                        <input type="text" className="input w-32 input-bordered ml-3 " placeholder="Friend" value={newRelation} onChange={(e) => setNewRelation(e.target.value)} />
                      </div>
                    ) : 
                    (<div className=' mt-2 ml-3 mr-12  text-xl'>{relation}</div>)}
                  </div>
                  {isEditing ? (
                      <div className="input-xs">
                        <input type="text" className="input input-bordered mb-3" placeholder="Friend" value={newOccupation} onChange={(e) => setNewOccupation(e.target.value)} />
                      </div>
                    ) : 
                    (<div className=' mt-4 text-sm'>{occupation}</div>)}
                  
                </div>
                <div className='card bg-base-100 shadow-xl overflow-auto max-h-[80vh] mt-8'>
                  <div className='card-body'>
                    {isEditing ? (
                      <textarea className="textarea textarea-bordered card-body h-40" placeholder="What memory would you like to share?" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                    ) : (
                      <div className='mt-2 ml-3'>{description}</div>
                    )}
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
