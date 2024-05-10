
import React from 'react';
import Accordion from './components/accordion';



const HomeContent: React.FC = () => {
  return (
    <div className='min-h-full bg-base-200 rounded-3xl'><div className='flex justify-end'>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mr-14 mt-4">|||</label>
        </div>
    <div className="hero min-h-full bg-base-200 rounded-3xl">
    <div className="hero-content flex-col-reverse lg:flex-row-reverse mr-12 ">
        <div className='w-full'>
        <div className='text-2xl mb-4 font-semibold'>How I can help you</div>
        <Accordion/>
      </div>
      <div className='ml-8'>
        <h1 className="text-7xl font-extrabold">Welcome, Sheethal!</h1>
        <p className="py-6">Welcome to your Memory Aid Assistant, a compassionate digital companion designed to support individuals with dementia. Our assistant is here to answer your questions and help you remember the important details of your life with ease and comfort.</p>
        <button className="btn btn-primary">Go to Assistant</button>
      </div>
    </div>
  </div>
  </div>
  );
};

export default HomeContent;