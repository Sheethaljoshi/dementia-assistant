"use client"
import { FaHandHoldingHeart } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Writings from '../components/flibbook';
import SubNav from "../components/subnav"; 


const MemoryContent: React.FC = () => {


    
  const [relatedPlace, setRelatedPlace] = useState([{date:"",description:""}]);
  const [originalPlace, setOriginalPlace] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const url = `http://127.0.0.1:8000/get/mem?email=sh33thal24@gmail.com&first_name=Sheethal&last_name=Joshi%20Thomas`;
              const response = await fetch(url);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log(data);
              setRelatedPlace(data);
              setOriginalPlace(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
  }, []);

    const sortPeopleAlphabetically = () => {
        const sortedPeople = [...relatedPlace].sort((a, b) => a.date.localeCompare(b.date));
        setRelatedPlace(sortedPeople);
    };

    const sortPeopleRecentlyAdded = () => {
        const reversedPeople = [...originalPlace].reverse(); // Reverse the current array
        setRelatedPlace(reversedPeople);
    };

  return (

            <div className="flex-grow">
                <div className='pl-6' >
                <h1 className="text-4xl m-6 font-extrabold flex"><div className='pr-7'><FaHandHoldingHeart /></div>Memories</h1>
                <div className='mb-8 ml-8 mr-8'>Life Archives invites you to journey through your digital collection, where each moment is a precious snapshot of your life&apos;s journey. Here, amidst the simplicity of design, your treasured memories await rediscovery and reflection.</div>
                </div>
                <div className='text-3xl font-extrabold pl-10 pt-3 pb-8 z-[1]'>
                <SubNav
                    mainButtonText="Life Archives"
                    parentText="Filter"
                    submenu1Text="Recently Added"
                    submenu2Text="Alphabetical Order"
                    item1Text="Add new"
                    item3Text="Add new"
                    onSubmenu2Click={sortPeopleAlphabetically}
                    onSubmenu1Click={sortPeopleRecentlyAdded}
                />
            </div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 ">
                    {relatedPlace.map((day, mem_index) => (
                        <Writings mem_index={mem_index} key={mem_index} {...day} />
                    ))}
                    </div>
                </div>
            </div>
        
  );
};

export default MemoryContent;