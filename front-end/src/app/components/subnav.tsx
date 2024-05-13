"use client"
import React, { Fragment, useState } from 'react';
import Modal from './modal';



interface SubNavProps {
  mainButtonText: string;
  parentText: string;
  submenu1Text: string;
  submenu2Text: string;
  item1Text: string;
  item3Text: string;
  onSubmenu2Click: () => void;
  onSubmenu1Click: () => void;
}

const SubNav: React.FC<SubNavProps> = ({
  mainButtonText,
  parentText,
  submenu1Text,
  submenu2Text,
  item1Text,
  item3Text,
  onSubmenu2Click,
  onSubmenu1Click,
}) => {
    const [showModal, setShowModal] = useState(false);
    
  return (
    <Fragment>
    <div className="navbar bg-secondary rounded-3xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary rounded-box w-52 dark:text-black">
            <li>
              <a>{mainButtonText}</a>
            </li>
            <li>
              <a>{parentText}</a>
              <ul className="p-2">
                <li>
                  <a>{submenu1Text}</a>
                </li>
                <li>
                  <a>{submenu2Text}</a>
                </li>
              </ul>
            </li>
            <li>
              <a>{item1Text}</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl dark:text-black">{mainButtonText}</a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-[1]">
        <div className='menu menu-horizontal gap-6'>
          <li>
            <details >
              <summary className='bg-base-200 px-7 py-4 btn'>{parentText}</summary>
              <ul className="p-2 bg-base-200">
                <li>
                  <a onClick={onSubmenu1Click}>{submenu1Text}</a>
                </li>
                <li>
                  <a onClick={onSubmenu2Click}>{submenu2Text}</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
          <a className="btn" onClick={()=>setShowModal(true)}>{item3Text}</a>
          </li>
          <Modal isVisible={showModal} onClose ={()=>setShowModal(false)}/>
          </div>
        </ul>
      </div>
    </div>
    
    </Fragment>
  );
};

export default SubNav;
