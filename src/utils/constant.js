export const USER_AVATAR = "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const API_Options ={
  method:"GET",
  headers:{
      accept:"application/json",
      Authorization:
             'Bearer ' + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BG_URL = 'https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg' ;


export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hi", name: "Hindi" },
  { identifier: "es", name: "Spanish" },
  { identifier: "ta", name: "Tamil" },
  { identifier: "bn", name: "Bengali" },
  { identifier: "pa", name: "Punjabi" },
  { identifier: "ur", name: "Urdu" },
  { identifier: "mr", name: "Marathi" },
  { identifier: "it", name: "Italian" },
  { identifier: "fr", name: "French" },
  { identifier: "tr", name: "Turkish" },
  // Add more languages as needed
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY ;
