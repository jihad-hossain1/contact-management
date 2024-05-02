'use client'

import { UserTypeResponse } from '@/helpers/interface'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LogoutPage = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const [currentUser, setCurrentUser] = useState<UserTypeResponse>()

    useEffect(() => {
        async function getCurrentUser() {
            setLoading(true)
            const response = await fetch('/api/v1/users/user')
            const data = await response.json()
            setCurrentUser(data)
            setLoading(false)
        }
        getCurrentUser()
    }, [])


    const handleLogout = async () => {
        setLoading(true)
        const response = await fetch('/api/v1/users/logout')
        const data = await response.json()

        setSuccess("Logout successful. Redirecting to login...")
        setLoading(false)
    }
    return (
        <main className='max-w-screen-xl m-auto flex justify-center items-center min-h-[100vh] my-4'>
            <div className=' rounded-2xl shadow border border-blue-100 p-5 md:p-20 '>
                <div className='flex flex-col gap-6'>
                    <div className='flex justify-center mb-7'>
                        <Image src={"/logo.png"} alt="logo" width={200} height={200} />
                    </div>
                    <h4 className='text-center'>
                        The password has been send to your registered email <br className='hidden md:block' /> address. Kindly check your email inbox and spam <br className='hidden md:block' /> folder.
                    </h4>
                    {success && <p className='text-green-500'>{success}</p>}
                    {currentUser ? (<button className='py-1 px-4 shadow-sm hover:shadow bg-[#3366CC] text-white rounded' onClick={handleLogout}> {loading ? 'Loading...' : 'Logout'} </button>) : (<Link href={'/login'} className='py-1 px-4 shadow-sm hover:shadow bg-[#3366CC] text-white rounded'>Login</Link>)}
                </div>
            </div>
        </main>
    )
}

export default LogoutPage