import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/userAtoms/userState.js'
import { useState } from 'react';
import { isUserLoading } from '../recoil/selectors/userSelectors.js';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const setUser = useSetRecoilState(userState);

  const loading = useRecoilValue(isUserLoading);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUser({isLoading: true});
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        setError(data.message);
        setUser({isLoading: false, user: null});
        return;
      }
      setError(null);
      setUser({isLoading: false, user: data})
      navigate('/sign-in');
    } catch (error) {
      setUser({isLoading:false, user: null});
      setError(error.message);
    }
  }
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className='text-3xl text-center font-semibold my-7'>
          Sign Up
        </h1>
        <form 
          className='flex flex-col gap-4'
          onSubmit={handleSubmit}
        >
          <input 
            type="text"  
            placeholder='username'
            id='username'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
        
          <input 
            type="email"  
            placeholder='username@example.com'
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
            disabled={loading}
            className='bg-gradient-to-r
              from-purple-800 via-blue-600 to-pink-300
              rounded-lg uppercase hover:opacity-95
              p-3 disabled:opacity-80 text-white'
            >
            {loading? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={'/sign-in'} className='text-blue-900'>
            Sign In
          </Link>
        </div>
        {error && <p className='text-red-800 mt-5'> {error} </p> }
      </div>
    </div>
  )
}
