import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div>
      <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to={'/sign-up'} className='text-blue-900'>
            Sign Up
          </Link>
        </div>
    </div>
  )
}
