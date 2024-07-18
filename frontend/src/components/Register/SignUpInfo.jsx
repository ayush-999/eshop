import { Field, ErrorMessage } from 'formik';

const SignUpInfo = () => {
   return (
      <div className='space-y-4 md:space-y-4'>
         <div>
            <label
               htmlFor='fname'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Your full name
            </label>
            <Field
               type='text'
               name='fname'
               id='fname'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5'
               placeholder='Enter full name'
               autoComplete='off'
            />
            <ErrorMessage
               name='fname'
               component='div'
               className='text-red-500 text-sm'
            />
         </div>
         <div>
            <label
               htmlFor='email'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Your email
            </label>
            <Field
               type='email'
               name='email'
               id='email'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5'
               placeholder='Enter your email'
               autoComplete='email'
            />
            <ErrorMessage
               name='email'
               component='div'
               className='text-red-500 text-sm'
            />
         </div>
      </div>
   );
};

export default SignUpInfo;
