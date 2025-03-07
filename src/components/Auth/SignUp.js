'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import OAuthButton from './OAuthButton';
import GoogleIcon from '../Icons/GoogleIcon';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
});

const SignUp = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signUp(formData) {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Success! Please check your email for confirmation instructions.');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Create Account</h2>
      
      <div className="w-full">
        <OAuthButton 
          provider="google"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 mb-4"
        >
          <GoogleIcon />
          <span>Sign up with Google</span>
        </OAuthButton>
        
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-2 text-gray-500 bg-white text-sm">or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
      </div>
      
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={signUp}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="column w-full">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <Field
              className={cn('input', errors.email && touched.email && 'bg-red-50 border-red-300')}
              id="email"
              name="email"
              placeholder="jane@example.com"
              type="email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-600 text-sm">{errors.email}</div>
            ) : null}

            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <Field
              className={cn('input', errors.password && touched.password && 'bg-red-50 border-red-300')}
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-600 text-sm">{errors.password}</div>
            ) : null}
            
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>

            <button 
              className="button-inverse w-full flex justify-center items-center" 
              type="submit"
              disabled={isLoading || isSubmitting}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing up...
                </span>
              ) : 'Create Account'}
            </button>
          </Form>
        )}
      </Formik>
      
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm w-full">
          {errorMsg}
        </div>
      )}
      
      {successMsg && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm w-full">
          {successMsg}
        </div>
      )}
      
      <Link href="/sign-in" className="link w-full text-center">
        Already have an account? Sign In.
      </Link>
    </div>
  );
};

export default SignUp;