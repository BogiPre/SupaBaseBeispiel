import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="card w-full max-w-md">
      <div className="bg-red-100 p-6 rounded-full">
        <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
        </svg>
      </div>
      
      <h2 className="text-center">Page Not Found</h2>
      
      <div className="text-center text-gray-600 mb-6">
        We couldn't find the page you were looking for.
      </div>
      
      <Link href="/" className="button-inverse w-full text-center">
        Return to Home
      </Link>
    </div>
  );
}