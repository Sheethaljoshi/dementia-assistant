"use client"
import React, { useState } from 'react';
import Card from '../components/card';
import { MdEmojiPeople } from "react-icons/md";
import SubNav from '../components/subnav';




const CardPage: React.FC = () => {

    const relatedPeopleInitial = [
        {
          name: "Alice",
          relation_to_person: "Sister",
          occupation: "Software Engineer",
          description: "Loves hiking and reading mystery novels."
        },
        {
            name: "David",
            relation_to_person: "Cousin",
            occupation: "Teacher",
            description: "Teaches mathematics and enjoys photography."
          },  
        {
          name: "Bob",
          relation_to_person: "Friend",
          occupation: "Graphic Designer",
          description: "Enjoys painting and playing guitar in a band."
        },
        {
          name: "Charlie",
          relation_to_person: "Colleague",
          occupation: "Data Analyst",
          description: "Passionate about data visualization and analytics."
        },
        
        {
          name: "Frank",
          relation_to_person: "Mentor",
          occupation: "Entrepreneur",
          description: "Started multiple successful businesses and enjoys mentoring."
        },
        {
          name: "Grace",
          relation_to_person: "Aunt",
          occupation: "Chef",
          description: "Owns a restaurant and specializes in Italian cuisine."
        },
        {
            name: "Emma",
            relation_to_person: "Neighbor",
            occupation: "Nurse",
            description: "Works at the local hospital and volunteers at a shelter."
          },
        {
          name: "Hannah",
          relation_to_person: "Roommate",
          occupation: "Journalist",
          description: "Writes for a national newspaper and loves traveling."
        }
      ];
      

      const [relatedPeople, setRelatedPeople] = useState(relatedPeopleInitial);

        // Function to sort people based on alphabetical order of name
        const sortPeopleAlphabetically = () => {
            const sortedPeople = [...relatedPeople].sort((a, b) => a.name.localeCompare(b.name));
            setRelatedPeople(sortedPeople);
        };

        const sortPeopleRecentlyAdded = () => {
            const reversedPeople = [...relatedPeopleInitial].reverse(); // Reverse the initial array
            setRelatedPeople(reversedPeople);
          };

  return (

            <div className="flex-grow">
                <div className='pl-6' >
                <h1 className="text-4xl m-7 font-extrabold flex"><div className='pr-4'><MdEmojiPeople /></div>People</h1>
                <div className='mb-8 ml-8 mr-8'>Welcome to &quot;Our Loved Ones,&quot; a special place where we celebrate the cherished people in your life. Here, we honor the beautiful connections you&apos;ve made throughout your journey, each person a shining star in your universe. Through heartfelt descriptions and cherished photographs, we reminisce about the wonderful moments shared with these beloved individuals.</div>
                </div>
                <div className='text-3xl font-extrabold pl-10 pt-3 pb-8 z-[1]'><SubNav
                                                                                mainButtonText="Our Loved Ones"
                                                                                parentText="Filter"
                                                                                submenu1Text="Recently Added"
                                                                                submenu2Text="Alphabetical Order"
                                                                                item1Text="Add new"
                                                                                item3Text="Add new"
                                                                                onSubmenu2Click={sortPeopleAlphabetically}
                                                                                onSubmenu1Click ={sortPeopleRecentlyAdded}
                                                                                />
            </div>
                <div className="flex justify-center items-center">
                    <div className="grid  grid-cols-1 lg:grid-cols-2 gap-9 w-full max-w-screen-lg lg:mx-auto ml-11">
                    {relatedPeople.map((person) => (
                        <Card key={person.name} {...person} />
                            ))}
                    </div>
                </div>
            </div>
        
  );
};

export default CardPage;