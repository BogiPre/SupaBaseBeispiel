'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const UpdatePassword = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function updatePassword(formData) {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        // Go to Home page
        router.replace('/');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Update Password</h2>
      <p className="text-gray-600 text-center mb-4">
        Please create a new secure password for your account.
      </p>
      
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={updatePassword}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="column w-full">
            <label htmlFor="password" className="text-gray-700 font-medium">New Password</label>
            <Field
              className={cn('input', errors.password && touched.password && 'bg-red-50 border-red-300')}
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600 text-sm">{errors.password}</div>
            ) : null}
            
            <label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</label>
            <Field
              className={cn('input', errors.confirmPassword && touched.confirmPassword && 'bg-red-50 border-red-300')}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-red-600 text-sm">{errors.confirmPassword}</div>
            ) : null}
            
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
            
            <button 
              className="button-inverse w-full flex justify-center items-center mt-2" 
              type="submit"
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Password...
                </span>
              ) : 'Update Password'}
            </button>
          </Form>
        )}
      </Formik>
      
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm w-full">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;