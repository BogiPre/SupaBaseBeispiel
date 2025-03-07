'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassword = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function resetPassword(formData) {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Password reset instructions sent. Please check your email.');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Reset Password</h2>
      <p className="text-gray-600 text-center mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={resetPassword}
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
                  Sending...
                </span>
              ) : 'Send Reset Instructions'}
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
      
      <Link href="/sign-in" className="link w-full text-center mt-2">
        Remember your password? Sign In
      </Link>
    </div>
  );
};

export default ResetPassword;