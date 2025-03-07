'use client';

import Link from 'next/link';
import { useRole } from './RoleContext';

const Navigation = () => {
  const { isAdmin, loading } = useRole();

  return (
    <nav className="mb-6 w-full flex justify-center">
      <div className="flex gap-2 text-sm">
        <Link 
          href="/" 
          className="px-3 py-1 rounded-full hover:bg-green-100 text-green-600 transition-colors"
        >
          Home
        </Link>
        <Link 
          href="/profile" 
          className="px-3 py-1 rounded-full hover:bg-green-100 text-green-600 transition-colors"
        >
          Profile
        </Link>
        {!loading && isAdmin && (
          <Link 
            href="/admin" 
            className="px-3 py-1 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors"
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;