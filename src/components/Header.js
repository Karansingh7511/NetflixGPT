import React from 'react'

import { LOGO } from "../utils/constant";
import { signOut , onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser , removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constant';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
//      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(()=> {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
         if (user) {
           
           const {uid, displayName , email , photoURL} = user;
           dispatch(addUser({uid:uid, email: email, displayName: displayName , photoURL: photoURL}));
           navigate("/browse");
         } else {
           // User is signed out
           dispatch(removeUser());            
           navigate("/");
         }
       });

       return () => unsubscribe();
       
  }, []);

   const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView());
   }

   const handleLanguageChange = (e) => {
           dispatch(changeLanguage(e.target.value));
   }

  return (
    <div className='absolute px-7 py-3 bg-gradient-to-b from-black z-10 w-screen flex flex-col md:flex-row justify-between'>
       <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='logo'/>
            { user && (<div className='flex p-2 justify-between gap-4'>
               {showGptSearch && (
                 <select onChange={handleLanguageChange} className='p-2 bg-gray-900 text-white rounded-lg m-2'>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                     <option key={lang.identifier} value={lang.identifier}>
                         {lang.name}
                     </option>
                  ))}
                </select>                
             ) }
                <button className='py-2 px-4 mx-4 my-2 bg-gradient-to-r from-red-600 to-red-900 hover:from-red-500 hover:to-red-700 text-white rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out border-2 border-red-900' onClick={handleGptSearchClick}>
                   {showGptSearch ? "Homepage" : "Chatgpt search"}
                </button>        
                <button onClick={handleSignOut} className='py-2 px-4 mx-4 my-2 bg-gradient-to-r from-red-600 to-red-400 hover:from-red-400 hover:to-red-600 text-white rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out border-2 border-red-900'>Log Out</button>           
               <img   src={user?.photoURL} alt='user-icon ' className='hidden md:block w-14 h-14 rounded-md shadow-md border-2 border-red-900 hover:shadow-lg transition duration-300 ease-in-out' />
             
            </div> )}
    </div>
  )
}

export default Header
