'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const OAuthButton = ({ provider, children, className }) => {
  const supabase = createClientComponentClient();

  async function signInWithOAuth() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('OAuth error:', error);
    }
  }

  return (
    <button
      type="button"
      onClick={signInWithOAuth}
      className={className || "oauth-button w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"}
    >
      {children}
    </button>
  );
};

export default OAuthButton;