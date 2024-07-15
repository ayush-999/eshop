/* eslint-disable react/prop-types */
const SignUpInfo = ({ formData, setFormData }) => {
   return (
      <div className='space-y-4 md:space-y-4'>
         <div>
            <label
               htmlFor='fname'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Your full name
            </label>
            <input
               type='text'
               name='fname'
               id='fname'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5'
               placeholder='Enter full name'
               value={formData.fname}
               onChange={(e) =>
                  setFormData({ ...formData, fname: e.target.value })
               }
               autoComplete='name'
            />
         </div>
         <div>
            <label
               htmlFor='email'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Your email
            </label>
            <input
               type='email'
               name='email'
               id='email'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5'
               placeholder='name@company.com'
               value={formData.email}
               onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
               }
               autoComplete='email'
            />
         </div>
      </div>
   );
};
export default SignUpInfo;
