'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRole } from './RoleContext';

export default function PromoteToAdmin({ userId }) {
  const supabase = createClientComponentClient();
  const { isAdmin } = useRole();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Only admins can promote other users
  if (!isAdmin) {
    return null;
  }

  async function handlePromote() {
    try {
      setIsLoading(true);
      setMessage(null);
      setError(null);

      // Call the RPC function to promote the user
      const { error } = await supabase.rpc('promote_to_admin', {
        user_id: userId,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('User has been promoted to admin successfully.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        onClick={handlePromote}
        disabled={isLoading}
      >
        {isLoading ? 'Promoting...' : 'Promote to Admin'}
      </button>

      {message && (
        <div className="mt-2 p-2 bg-green-50 text-green-700 rounded-md text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-2 p-2 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}