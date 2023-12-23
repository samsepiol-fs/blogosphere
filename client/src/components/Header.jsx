import React from 'react'
import { Link } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to={'/'}>
                <h1 className='text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-700 font-semibold'>
                        _blogo
                    </span>
                    <span className='text-gray-900 font-bold'>
                        sphere
                    </span>
                </h1>
            </Link>
            <form 
                className='bg-slate-100 rounded-lg flex items-center p-3'>
                <input 
                    type="text" 
                    placeholder='Search...'
                    className='bg-transparent focus:outline-none w-24 sm:w-64'
                />
                <button>
                    <FaSearch className='text-slate-600' />
                </button>
            </form>
            <ul className='flex gap-2'>
                <Link to={'/'}>
                    <li className='hidden sm:inline hover:underline text-slate-700'>
                        Home
                    </li>
                </Link>
                <Link to={'/about'}>
                    <li className='hidden sm:inline hover:underline text-slate-700'>
                        About
                    </li>
                </Link>
                <Link to={'/sign-in'}>
                    <li className='hover:underline text-slate-700'>
                        Login
                    </li>
                </Link>
            </ul>
        </div>
    </header>
  )
}