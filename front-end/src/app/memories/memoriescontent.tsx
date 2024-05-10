import { FaHandHoldingHeart } from "react-icons/fa";
import React from 'react';
import Writings from '../components/flibbook';
import SubNav from "../components/subnav";


const MemoryContent: React.FC = () => {
  return (

            <div className="flex-grow">
                <div className='pl-6' >
                <h1 className="text-4xl m-6 font-extrabold flex"><div className='pr-7'><FaHandHoldingHeart /></div>Memories</h1>
                <div className='mb-8 ml-8 mr-8'>Life Archives invites you to journey through your digital collection, where each moment is a precious snapshot of your life&apos;s journey. Here, amidst the simplicity of design, your treasured memories await rediscovery and reflection.</div>
                </div>
                <div className='text-3xl font-extrabold pl-10 pt-3 pb-8 z-[1]'><SubNav
                                                                                mainButtonText="Life Archives"
                                                                                parentText="Filter"
                                                                                submenu1Text="Sort by Date"
                                                                                submenu2Text="Sort by Emotion"
                                                                                item1Text="Add new"
                                                                                item3Text="Add new"
                                                                                />
            </div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 ">
                        <Writings/>
                        <Writings/>
                        <Writings/>
                        <Writings/>
                        <Writings/>
                        <Writings/>
                    </div>
                </div>
            </div>
        
  );
};

export default MemoryContent;