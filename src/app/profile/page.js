import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';

// Utility to format date
function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Get the user's provider
  const provider = user?.app_metadata?.provider || 'email';

  return (
    <div className="card w-full max-w-md">
      <div className="flex items-center justify-center w-full mb-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
      </div>
      
      <h2 className="w-full text-center mb-4">User Profile</h2>
      
      <div className="w-full space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h3 className="font-medium text-gray-700">Account Information</h3>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium">{user.email}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Auth Provider</div>
              <div className="font-medium capitalize">{provider}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Last Sign In</div>
              <div className="font-medium">{formatDate(user.last_sign_in_at)}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Account Created</div>
              <div className="font-medium">{formatDate(user.created_at)}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
        <Link className="button flex-1 text-center" href="/">
          Go Home
        </Link>
        <SignOut />
      </div>
    </div>
  );
}