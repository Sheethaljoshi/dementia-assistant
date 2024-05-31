"use client"
import React, { Fragment, useState } from 'react';
import Modal3 from './modal3';

interface CardProps{
  date: string;
  description: string;
  mem_index: number;

}

const Writings: React.FC<CardProps> = ({ date, description, mem_index}) => {
  const limitedDescription = description.substring(0, 45) + (description.length > 30 ? '...' : '');

  const [showModal3, setShowModal3] = useState(false);
  return (
    <Fragment>
    <div className="card w-80 lg:w-96  bg-primary text-primary-content ml-14 mr-20">
  <div className="card-body">
    <h2 className="card-title">{date}</h2>
    <p>{limitedDescription}</p>
    <div className="card-actions justify-end">
    <button onClick={()=>setShowModal3(true)} className="btn" >Read more</button>
    </div>
  </div>
  <Modal3 isVisible={showModal3} onClose={() => setShowModal3(false)} date={date} description={description} mem_index={mem_index}/>
</div>
</Fragment>
  );
};

export default Writings;