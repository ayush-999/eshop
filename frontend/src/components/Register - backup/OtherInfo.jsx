/* eslint-disable react/prop-types */
import { useState } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

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
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5 input-with-icon'
               placeholder='••••••••'
               value={formData.password}
               onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
               }
               autoComplete='current-password'
            />
            <span
               className='icon-container text-gray-400'
               onClick={togglePasswordVisibility}
            >
               {isPasswordVisible ? <RiEyeCloseLine /> : <RiEyeLine />}
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
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5 input-with-icon'
               placeholder='••••••••'
               value={formData.confirmPassword}
               onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
               }
               autoComplete='current-password'
            />
            <span
               className='icon-container text-gray-400'
               onClick={toggleConfirmPasswordVisibility}
            >
               {isConfirmPasswordVisible ? <RiEyeCloseLine /> : <RiEyeLine />}
            </span>
         </div>
      </div>
   );
};

export default OtherInfo;
