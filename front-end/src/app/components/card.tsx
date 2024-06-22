"use client"
import React, { Fragment, useState } from 'react';
import Modal1 from './modal1';

interface CardProps {
  name: string;
  description: string;
  relation: string;
  occupation: string;
  person_index: number;
  image_url?: string;
}

const Card: React.FC<CardProps> = ({ name, relation, description, occupation, person_index,image_url}) => {
  const limitedDescription = description.substring(0, 35) + (description.length > 30 ? '...' : '');

  const [showModal1, setShowModal1] = useState(false);

  return (
    <Fragment>
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="h-64 lg:h-full">
      {(image_url) ? <img src={image_url} className='object-cover w-full h-full' />: <img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" className='object-cover w-full h-full' />}
      </figure>
      <div className="card-body">
        <div>
          <h2 className="card-title">{name}</h2>
          <p className='text-xs mt-2 font-bold'>{relation}</p>
        </div>
        <p className="text-sm md:text-base">{limitedDescription}</p>
        <div className="card-actions justify-end ">
          <button onClick={()=>setShowModal1(true)} className="btn btn-primary" >Know more</button>
        </div>
      </div>
      <Modal1 isVisible={showModal1} onClose={() => setShowModal1(false)} name={name} description={description} relation={relation} occupation={occupation} person_index={person_index} image_url={image_url}/>
    </div>
    </Fragment>
  
  );
};

export default Card;
