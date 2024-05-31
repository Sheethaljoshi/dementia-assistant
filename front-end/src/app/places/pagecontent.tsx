
"use client"
import { FaMapMarkedAlt } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import Carousel from '../components/carousel';
import ClickPick from '../components/clickpic';
import SubNav from "../components/subnav";



const PlaceContent: React.FC = () => {

  const [relatedPlace, setRelatedPlace] = useState([{place_name:"",description:""}]);
  const [originalPlace, setOriginalPlace] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const url = `http://127.0.0.1:8000/get/place?email=sh33thal24@gmail.com&first_name=Sheethal&last_name=Joshi%20Thomas`;
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
        const sortedPeople = [...relatedPlace].sort((a, b) => a.place_name.localeCompare(b.place_name));
        setRelatedPlace(sortedPeople);
    };

    const sortPeopleRecentlyAdded = () => {
        const reversedPeople = [...originalPlace].reverse(); // Reverse the current array
        setRelatedPlace(reversedPeople);
    };


  return (
    <div className="flex-grow">
    <div className='pl-6' >
    <h1 className="text-4xl m-7 font-extrabold flex"><div className='pr-7'><FaMapMarkedAlt /></div>Places</h1>
    <div className='mb-8 ml-8 mr-8'>Memory Lane is a compassionate space designed with you in mind. As memory fades and familiar places become distant echoes, we offer a comforting virtual sanctuary where cherished memories can be revisited and celebrated.</div>
    <Carousel/>
    </div>
    <div className='text-3xl font-extrabold pl-10 pt-3 pb-8 z-[1]'>
                <SubNav
                    mainButtonText="Memory Lane"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 w-full max-w-screen-lg mx-auto">
        {relatedPlace.map((place, place_index) => (
                        <ClickPick place_index={place_index} key={place_index} {...place} />
                    ))}
        </div>
    </div>
</div>
  );
};

export default PlaceContent;