import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/userAtoms/userState';
import { isUserLoading } from '../recoil/selectors/userSelectors.js';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const setUser = useSetRecoilState(userState);
  const loading = useRecoilValue(isUserLoading);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser({isLoading:true});
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
        setUser({isLoading: false, user: null});
        setError(data.message);
        return;
      }
      setUser({isLoading: false, user: data});
      setError(null);
      navigate('/')
    } catch (error) {
      setUser({isLoading:false, user: null});
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
              {loading? 'Signing In...' : 'Sign In'}
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
