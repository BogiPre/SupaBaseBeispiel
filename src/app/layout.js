import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthProvider from 'src/components/AuthProvider';
import Navigation from 'src/components/Navigation';
import 'src/styles/globals.css';

// do not cache this layout
export const revalidate = 0;

export const metadata = {
  title: 'Next.js with Supabase Auth',
  description: 'A modern authentication system with Next.js and Supabase',
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex min-h-screen flex-col items-center justify-center py-6 px-4">
          <main className="flex w-full max-w-md flex-1 shrink-0 flex-col items-center justify-center text-center">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
                Next.js with <span className="font-black text-green-500">Supabase</span>
              </h1>
              <p className="mt-2 text-gray-600">Modern authentication for your app</p>
            </div>

            <AuthProvider accessToken={session?.access_token}>
              {session && <Navigation />}
              {children}
            </AuthProvider>
          </main>
          <footer className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Next.js with Supabase Auth
          </footer>
        </div>
      </body>
    </html>
  );
}