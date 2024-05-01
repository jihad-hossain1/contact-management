import Link from 'next/link'
import React from 'react'
import { TiContacts } from "react-icons/ti";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh] bg-gradient-to-b from-[#C2DAFF] to-[#EFF1F0]'>

      <div className='flex flex-col md:flex-row md:items-center gap-5'>
        <Link href={'/contact-us'} className='flex items-center gap-1 hover:border-b hover:border-blue-600'><TiContacts /> Contact Us</Link>
        <Link href={'/login'} className='flex items-center gap-1 hover:border-b hover:border-blue-600'><CiLogin /> Login</Link>
        <Link href={'/sign-up'} className='flex items-center gap-1 hover:border-b hover:border-blue-600'><FaUserPlus /> Signup</Link>
      </div>
    </div>
  )
}

export default HomePage