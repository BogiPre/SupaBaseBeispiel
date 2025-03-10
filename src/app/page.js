import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Get the provider (google or email)
  const provider = user?.app_metadata?.provider || 'email';

  return (
    <div className="card w-full max-w-lg">
      <div className="bg-green-100 p-6 rounded-full">
        <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
      </div>
      
      <h2 className="text-center">Welcome Back!</h2>
      
      <div className="text-center text-gray-600 mb-4">
        You've successfully signed in with <span className="font-semibold capitalize">{provider}</span>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-full">
        <div className="text-sm text-gray-500 mb-1">Your Email</div>
        <div className="font-medium text-gray-800 break-all">{user.email}</div>
      </div>
      
      <div className="flex flex-col sm:flex-row w-full gap-3 mt-4">
        <Link className="button flex-1 text-center" href="/profile">
          View Profile
        </Link>
        <SignOut />
      </div>
      
      <div className="w-full text-center mt-6">
        <div className="text-sm text-gray-500">Need help?</div>
        <a href="#" className="text-green-500 hover:text-green-600 font-medium">Contact Support</a>
      </div>
    </div>
  );
}