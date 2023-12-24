import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className='text-3xl text-center font-semibold my-7'>
          Sign In
        </h1>
        <form 
          className='flex flex-col gap-4'
        >
          <input 
            type="email"  
            placeholder='username@example.com'
            id='email'
            className='border p-3 rounded-lg'
            
          />
      
          <input 
            type="password"  
            placeholder='password'
            id='password'
            className='border p-3 rounded-lg'
           
          />
          
          <button 
            
            className='bg-gradient-to-r
              from-purple-800 via-blue-600 to-pink-300
              rounded-lg uppercase hover:opacity-95
              p-3 disabled:opacity-80 text-white'
            >
              Sign In
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to={'/sign-up'} className='text-blue-900'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
