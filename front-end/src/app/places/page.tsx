import { FaRegCompass } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";

import Link from 'next/link';
import Carousel from "../components/carousel";
import PlaceContent from "./pagecontent";

export default function Places() {
    return (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex m-6">
        <PlaceContent/>
      <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">|||</label>
    
    </div> 
    <div className="drawer-side rounded-t-3xl rounded-b-3xl sm:rounded-t-3xl sm:rounded-b-3xl shadow-2xl dark:shadow-2xl ">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content round">
        <div className="text-3xl font-extrabold m-5 flex">Explore<div className="ml-2 mt-1"><FaRegCompass /></div></div>
        <div className="flex flex-col ">
        <div className='items-center mb-8'>
        <li className='p-2 '><Link href="/" className='text-lg flex justify-center font-bold'><div ><FaHome /></div>Home</Link></li>
        <li className='p-2'><Link href="/people" className='text-lg flex justify-center font-bold'><div><MdEmojiPeople /></div>People</Link></li>
        <li className='p-2'><Link href="/places" className='text-lg flex justify-center font-bold'><div><FaMapMarkedAlt /></div>Places</Link></li>
        <li className='p-2'><Link href="/memories" className='text-lg flex justify-center font-semibold'><div><FaHandHoldingHeart /></div>Memories</Link></li>
        </div>
        <div className="flex mt-72 justify-end">
        <label className="flex cursor-pointer gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          <input type="checkbox" value="dark" className="toggle theme-controller"/>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label>
        </div>
        </div>
      </ul>
    </div>
  </div>
    )
}