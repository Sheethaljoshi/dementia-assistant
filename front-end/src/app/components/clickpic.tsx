"use client"
import React, { Fragment, useState } from 'react';
import Modal2 from './modal2';

interface CardProps {
  place_name: string;
  description: string;
  place_index: number;
}

const Card: React.FC<CardProps> = ({ place_name, description, place_index }) => {
  const limitedDescription = description 
    ? description.substring(0, 35) + (description.length > 30 ? '...' : '') 
    : '';

  const [showModal2, setShowModal2] = useState(false);

  return (
    <Fragment>
      <div className="collapse bg-base-200 w-80 lg:w-auto ml-14 mt-2">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <div className='text-2xl font-bold'>{place_name}</div>
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className='ml-3 rounded-xl w-50 mt-3 mb-3' />
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <p>{limitedDescription}</p>
          <div className="card-actions justify-end pt-4 pb-2 pr-4">
            <button onClick={() => setShowModal2(true)} className="btn btn-primary">Know more</button>
          </div>
        </div>
        <Modal2 isVisible={showModal2} onClose={() => setShowModal2(false)} place_name={place_name} description={description} place_index={place_index} />
      </div>
    </Fragment>
  );
};

export default Card;
