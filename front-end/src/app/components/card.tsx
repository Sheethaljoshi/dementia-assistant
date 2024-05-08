
import React from 'react';

const Card: React.FC = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
   <figure className="h-64 md:h-auto"><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">A Dude</h2>
    <p className="text-sm md:text-base">Broski is heppy heppy. heppy broski heppy life.</p>
    <div className="card-actions justify-end ">
      <button className="btn btn-primary ">Know more</button>
    </div>
  </div>
</div>
  );
};

export default Card;