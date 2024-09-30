"use client"
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter()
  const handleLogin = async () => {
    try {
      setError(null); // Clear previous error
      const response = await axios.post('/api/users/login', { email, password });
      if (response) {
        setSuccess(true);
        router.push("/profile");
      }
    } catch (err: unknown) {
      setSuccess(false);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Login failed. Please try again.');
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };
  
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };
  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email,password]);
  return (
    <div className="flex pt-20 justify-center min-h-screen ">
      <div className=" shadow-lg rounded-lg p-8 max-w-md w-full space-y-10">
        <h2 className="text-4xl font-bold text-center  mb-14">Login</h2>
        {success ? (
          <div className="text-green-600 text-center mb-4">
            Login successful! Welcome back.
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-200 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-200 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogin}
                disabled={buttonDisabled}
                className="bg-blue-500 enabled:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:cursor-not-allowed"
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;