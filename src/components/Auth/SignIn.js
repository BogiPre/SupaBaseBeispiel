'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import OAuthButton from './OAuthButton';
import GoogleIcon from '../Icons/GoogleIcon';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn(formData) {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMsg(error.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Sign In</h2>
      
      <div className="w-full">
        <OAuthButton 
          provider="google"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 mb-4"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
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
        validationSchema={SignInSchema}
        onSubmit={signIn}
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

            <Link href="/reset-password" className="link w-full text-sm">
              Forgot your password?
            </Link>

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
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </Form>
        )}
      </Formik>
      
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm w-full">
          {errorMsg}
        </div>
      )}
      
      <Link href="/sign-up" className="link w-full text-center">
        Don&apos;t have an account? Sign Up.
      </Link>
    </div>
  );
};

export default SignIn;