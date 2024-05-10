
import React from 'react';

const Accordion: React.FC = () => {
  return (
    <div className='w-full'><div className="collapse collapse-arrow bg-primary shadow-2xl">
    <input type="radio" name="my-accordion-2" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
    Ask Me Anything: 
    </div>
    <div className="collapse-content"> 
      <p>Whether it’s about your schedule, medication, or family events, just ask, and I’ll provide the information you need.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow bg-secondary shadow-2xl">
    <input type="radio" name="my-accordion-2" /> 
    <div className="collapse-title text-xl font-medium">
      Create your own Memory Vault
    </div>
    <div className="collapse-content"> 
      <p>Discover a world where your memories are preserved, cherished, and easily revisited. Our integrated feature—Memory Lane, Our Loved Ones, and Life Archives — serve as your personal digital memory vault, allowing you to store and celebrate every precious moment</p>
    </div>
  </div>
  <div className="collapse collapse-arrow bg-accent shadow-2xl">
    <input type="radio" name="my-accordion-2" /> 
    <div className="collapse-title text-xl font-medium">
      Develop Sense of Independence
    </div>
    <div className="collapse-content"> 
      <p>Remember, you’re not alone on this journey. I’m here to assist you every step of the way, making sure you feel supported and independent. Let’s navigate the days ahead together with confidence and peace of mind.</p>
    </div>
  </div></div>
  );
};

export default Accordion;