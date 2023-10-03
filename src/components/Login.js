import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from 'firebase/auth'; // Correct import
import { auth } from '../utils/firebase'; // Correct import
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constant';
import { BG_URL } from '../utils/constant';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);
  
 // const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);


  const handleButtonClick = () => {
     // Validate the form data
  const emailValue = email.current.value;
  const passwordValue = password.current.value;
  let fullnameValue = null; // Initialize with null

  if (!isSignInForm) {
    // Only set fullnameValue when signing up
    fullnameValue = fullname.current.value;
  }

  const message = checkValidateData(emailValue, passwordValue, fullnameValue);
   setErrorMessage(message);


  if(message) return;
  
  //Sign in Sign up logic
  if(!isSignInForm){
    //signup form 
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: fullnameValue , photoURL: USER_AVATAR
      }).then(() => {
        // Profile updated!
         
        const {uid, displayName , email , photoURL} = auth.currentUser;
        dispatch(addUser({uid:uid, email: email, displayName: displayName , photoURL: photoURL}));


        //navigate("/browse");
      }).catch((error) => {
          setErrorMessage(error.message);
      });
    
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" +errorMessage);
    });

  }else{
    //sign in form
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });

  }
  }

  const toggleSignInForm = () => {
     setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
         <Header />
         <div className='absolute '>
          <img className='h-screen object-cover w-screen ' src={BG_URL} alt='backgroundimage'/>
        </div>

        <form 
        onSubmit={(e) => e.preventDefault()}
        className='w-[60%] md:w-3/12  absolute p-10 bg-black mx-auto my-32  right-0 left-0 text-white rounded-lg bg-opacity-80 '>
             <h1 className='font-bold text-4xl py-4 text-red-70'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
             {!isSignInForm && <input 
                ref={fullname}
                type='text'
                placeholder='Full Name'
                className='p-4 my-4 bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
             />}
             
             <input 
                ref={email}
                type='text'
                placeholder='Email Address'
                className='p-4 my-4 bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
             />
             <input 
                ref={password}
                type='password'
                placeholder='Password'
                className='p-4 my-4 bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
             />
             <p className='text-red-500 font-bold py-2 text-lg'>{errorMessage}</p>
             <button className='p-4 my-6 bg-red-700 w-full rounded-lg hover:bg-red-800 text-white font-bold transition duration-300 ease-in-out' onClick={handleButtonClick}>
               {isSignInForm ? "Sign In" : "Sign Up"}
             </button>
             <p className='py-4 cursor-pointer text-blue-500 hover:underline' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
        </form>

    </div>
  )
}

export default Login
