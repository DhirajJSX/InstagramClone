import React from 'react';
import LoginForm from '../components/LoginForm';  // Assuming your LoginForm is in the components folder
import { Link } from 'react-router-dom';  // Link component for navigation

function LoginPage() {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      <LoginForm />
      
      {/* <div className="text-white mt-4">
        <span>
          Don&apos;t have an account?{' '}
          <Link to="/" className="text-[#0095f6] hover:underline">Sign Up</Link>
        </span>
      </div> */}
    </div>
  );
}

export default LoginPage;
