/* eslint-disable react/prop-types */
import { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { FaCamera } from 'react-icons/fa6';
import { ErrorMessage } from 'formik';
import './SignUp.css';
const PersonalInfo = ({ formData, setFormData }) => {
   const [imageSrc, setImageSrc] = useState(
      formData.userPic
         ? URL.createObjectURL(formData.userPic)
         : '/img/default.png'
   );

   const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         setImageSrc(URL.createObjectURL(file));
         setFormData('userPic', file);
      }
   };
   return (
      <>
         <div className='space-y-4 md:space-y-4'>
            <div className='flex justify-center'>
               <div className='imgWrapper'>
                  <label
                     htmlFor='userPic'
                     id='uploadBtn'
                     className='uploadBtn bg-gray-100 rounded-full hover:bg-primary-400 hover:text-white'
                  >
                     <FaCamera />
                  </label>
                  <img
                     src={imageSrc}
                     className='rounded-full ring-4 ring-gray-100 userImage'
                     id='userImage'
                     alt='User Image'
                  />
                  <input
                     type='file'
                     id='userPic'
                     className='userPic'
                     name='userPic'
                     onChange={handleImageUpload}
                  />
                  <ErrorMessage
                     name='userPic'
                     component='div'
                     className='text-red-500 text-sm'
                  />
               </div>
            </div>
            <div>
               <label
                  htmlFor='userCountry'
                  className='inline-block mb-2 text-sm font-medium text-gray-900'
               >
                  Country
               </label>
               <ReactFlagsSelect
                  name='userCountry'
                  selected={formData.userCountry}
                  onSelect={(code) => setFormData('userCountry', code)}
                  searchable
                  searchPlaceholder='Search countries'
                  placeholder='Select country'
                  className='country-dropdown'
               />
               <ErrorMessage
                  name='userCountry'
                  component='div'
                  className='text-red-500 text-sm'
               />
            </div>
         </div>
      </>
   );
};

export default PersonalInfo;
