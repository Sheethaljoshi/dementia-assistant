import React, { useState } from 'react';
import { RiHeartAdd2Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import axios from 'axios';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [personName, setPersonName] = useState('');
  const [therelation, setRelation] = useState('');
  const [theoccupation, setOccupation] = useState('');
  const [personDescription, setPersonDescription] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  const [placeImage, setPlaceImage] = useState<File | null>(null);
  const [thedate, setDate] = useState('');
  const [memoryDescription, setMemoryDescription] = useState('');

  const handleSubmit = async () => {
    let url = '';
    const formData = new FormData();
    formData.append('email', 'sh33thal24@gmail.com');
    formData.append('first_name', 'Sheethal');
    formData.append('last_name', 'Joshi Thomas');

    if (activeTab === 1) {
      url = `http://127.0.0.1:8000/insert/person`;
      formData.append('name', personName);
      formData.append('relation', therelation);
      formData.append('occupation', theoccupation);
      formData.append('description', personDescription);
    } else if (activeTab === 2) {
      url = `http://127.0.0.1:8000/insert/place`;
      formData.append('place_name', placeName);
      formData.append('place_description', placeDescription);
      if (placeImage) {
        formData.append('image', placeImage); // append the image directly to formData
      }
    } else if (activeTab === 3) {
      url = `http://127.0.0.1:8000/insert/memory`;
      formData.append('date', thedate);
      formData.append('mem_description', memoryDescription);
    }

    await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    onClose();
    window.location.reload();
  };

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-45 backdrop-blur flex justify-center items-center'>
      <div className='w-[600px]'>
        <div className='bg-base-200 p-7 rounded-3xl flex flex-col'>
          <div className='mb-7 mt-2 text-lg flex'>
            <div className='mr-2'>
              <IconContext.Provider value={{ size: 23 }}>
                <div>
                  <RiHeartAdd2Line />
                </div>
              </IconContext.Provider>
            </div>
            Add a new place, person, or memory
          </div>
          <div role="tablist" className="tabs tabs-lifted mb-6">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Person"
              checked={activeTab === 1}
              onChange={() => handleTabChange(1)}
            />
            <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${activeTab === 1 ? '' : 'hidden'}`}>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  Name:
                  <input type="text" className="grow" placeholder="Daisy" value={personName} onChange={(e) => setPersonName(e.target.value)} />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  Relation:
                  <input type="text" className="grow" placeholder="Friend" value={therelation} onChange={(e) => setRelation(e.target.value)} />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  Occupation:
                  <input type="text" className="grow" placeholder="Florist" value={theoccupation} onChange={(e) => setOccupation(e.target.value)} />
                </label>
              </div>
              <div className="mb-4">
                <textarea className="textarea-md textarea textarea-bordered w-full" placeholder="What memory would you like to share?" value={personDescription} onChange={(e) => setPersonDescription(e.target.value)}></textarea>
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Place"
              checked={activeTab === 2}
              onChange={() => handleTabChange(2)}
            />
            <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${activeTab === 2 ? '' : 'hidden'}`}>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  Name of Place:
                  <input type="text" className="grow" placeholder="Misty's Florals" value={placeName} onChange={(e) => setPlaceName(e.target.value)} />
                </label>
              </div>
              <div className="mb-4">
                <label className="flex flex-col gap-2">
                  Upload Image:
                  <input type="file" className="file-input file-input-primary file-input-bordered w-full max-w-xs" onChange={(e) => setPlaceImage(e.target.files ? e.target.files[0] : null)} />
                </label>
              </div>
              <div className="mb-4">
                <textarea className="textarea-md textarea textarea-bordered w-full" placeholder="Description" value={placeDescription} onChange={(e) => setPlaceDescription(e.target.value)}></textarea>
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Memory"
              checked={activeTab === 3}
              onChange={() => handleTabChange(3)}
            />
            <div role="tabpanel" className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${activeTab === 3 ? '' : 'hidden'}`}>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  Date:
                  <input type="text" className="grow" placeholder="DD-MM-YYYY" value={thedate} onChange={(e) => setDate(e.target.value)} />
                </label>
              </div>
              <div className="mb-4">
                <textarea className="textarea-md textarea textarea-bordered w-full" placeholder="What memory would you like to share?" value={memoryDescription} onChange={(e) => setMemoryDescription(e.target.value)}></textarea>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <button className='btn bg-secondary mr-2 dark:text-black' onClick={handleSubmit}>Submit</button>
            <button className='btn bg-primary dark:text-black' onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
