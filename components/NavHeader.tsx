import React from 'react'
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

const NavHeader = () => {
  return (
    <div className='flex items-center content-center gap-20'>
      <Link href='/'>
      <div className='flex flex-row items-center gap-3'>
        <img src="job.png" alt="job_logo" width='40px' />
        <h1 className='text-3xl font-extrabold'>JobQuest</h1>
      </div>
      </Link>

      <ThemeToggle></ThemeToggle>
    </div>
  )
}

export { NavHeader }; 
