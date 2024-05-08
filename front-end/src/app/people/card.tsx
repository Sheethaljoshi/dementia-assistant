
import React from 'react';
import Card from '../components/card';
import { MdEmojiPeople } from "react-icons/md";

const CardPage: React.FC = () => {
  return (

            <div className="flex-grow">
                <div className='pl-6' >
                <h1 className="text-4xl m-7 font-extrabold flex"><div className='pr-4'><MdEmojiPeople /></div>People</h1>
                <div className='mb-8 ml-8 mr-8'>Welcome to &quot;Our Loved Ones,&quot; a special place where we celebrate the cherished people in your life. Here, we honor the beautiful connections you&apos;ve made throughout your journey, each person a shining star in your universe. Through heartfelt descriptions and cherished photographs, we reminisce about the wonderful moments shared with these beloved individuals.</div>
                </div>
                <div className='text-3xl font-extrabold pl-10 pt-8 pb-8'>Our Loved Ones</div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-9 w-full max-w-screen-lg mx-auto">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        
  );
};

export default CardPage;