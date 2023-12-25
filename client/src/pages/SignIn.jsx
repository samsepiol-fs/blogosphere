import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/userAtoms/userState';
import { loadingState } from '../recoil/atoms/userAtoms/loadingState';
import { errorState } from '../recoil/atoms/userAtoms/errorState';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(loadingState);
  const setError = useSetRecoilState(errorState);

  const error = useRecoilValue(errorState);
  const isLoading = useRecoilValue(loadingState);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/signin`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setUser(data);
      setError(null);
      setLoading(false);
      navigate('/dashboard')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className='text-3xl text-center font-semibold my-7'>
          Sign In
        </h1>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'
        >
          <input 
            type="email"  
            placeholder='email@example.com'
            id='email'
            className='border p-3 rounded-lg'
            onChange={handleChange}
            
          />
      
          <input 
            type="password"  
            placeholder='password'
            id='password'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          
          <button 
            
            className='bg-gradient-to-r
              from-purple-800 via-blue-600 to-pink-300
              rounded-lg uppercase hover:opacity-95
              p-3 disabled:opacity-80 text-white'
            >
              {isLoading? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to={'/sign-up'} className='text-blue-900'>
            Sign Up
          </Link>
        </div>
        {error && <p className='text-red-800 mt-5'>{error}</p> }
      </div>
    </div>
  )
}
