/* eslint-disable react/prop-types */
import { useState } from 'react';

const OtherInfo = ({ formData, setFormData }) => {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
      useState(false);
   function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
   }
   function toggleConfirmPasswordVisibility() {
      setIsConfirmPasswordVisible((prevState) => !prevState);
   }

   return (
      <div className='space-y-4 md:space-y-4'>
         <div className='relative'>
            <label
               htmlFor='password'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Password
            </label>
            <input
               type={isPasswordVisible ? 'text' : 'password'}
               name='password'
               id='password'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5 input-with-icon'
               placeholder='••••••••'
               value={formData.password}
               onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
               }
               autoComplete='current-password'
            />
            <span
               className='icon-container text-gray-600'
               onClick={togglePasswordVisibility}
            >
               {isPasswordVisible ? (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-5 h-5'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                     />
                  </svg>
               ) : (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-5 h-5'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                     />
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                     />
                  </svg>
               )}
            </span>
         </div>
         <div className='relative'>
            <label
               htmlFor='confirm-password'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Confirm password
            </label>
            <input
               type={isConfirmPasswordVisible ? 'text' : 'password'}
               name='confirmPassword'
               id='confirmPassword'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5 input-with-icon'
               placeholder='••••••••'
               value={formData.confirmPassword}
               onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
               }
               autoComplete='current-password'
            />
            <span
               className='icon-container text-gray-600'
               onClick={toggleConfirmPasswordVisibility}
            >
               {isConfirmPasswordVisible ? (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-5 h-5'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                     />
                  </svg>
               ) : (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-5 h-5'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                     />
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                     />
                  </svg>
               )}
            </span>
         </div>
      </div>
   );
};

export default OtherInfo;
