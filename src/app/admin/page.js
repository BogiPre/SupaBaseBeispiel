import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminGuard from 'src/components/AdminGuard';

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <AdminGuard>
      <div className="card w-full max-w-lg">
        <div className="bg-purple-100 p-6 rounded-full">
          <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        </div>
        
        <h2 className="text-center">Admin Dashboard</h2>
        
        <div className="text-center text-gray-600 mb-6">
          Welcome to the admin area! This section is only accessible to administrators.
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-full mb-4">
          <h3 className="font-semibold text-lg mb-2">Admin Functions</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-white rounded border border-gray-100 hover:bg-gray-50 transition-colors">
              <Link href="/admin/manage-users" className="flex items-center text-purple-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
                Manage Users
              </Link>
            </li>
            <li className="p-2 bg-white rounded border border-gray-100 hover:bg-gray-50 transition-colors">
              <a href="#" className="flex items-center text-purple-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path>
                </svg>
                System Settings
              </a>
            </li>
            <li className="p-2 bg-white rounded border border-gray-100 hover:bg-gray-50 transition-colors">
              <a href="#" className="flex items-center text-purple-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd"></path>
                </svg>
                Audit Logs
              </a>
            </li>
          </ul>
        </div>
        
        <Link href="/" className="button w-full text-center">
          Return to Home
        </Link>
      </div>
    </AdminGuard>
  );
}