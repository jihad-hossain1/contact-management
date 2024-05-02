'use client'

import { UserTypeResponse } from '@/helpers/interface'
import { getCurrentUser } from '@/utils/fetchUser'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserAccount = () => {
    const [currentUser, setCurrentUser] = useState<UserTypeResponse>()
    const [sucess, setSuccess] = useState('')
    const router = useRouter()


    useEffect(() => {
        async function getCurrentUser() {
            const response = await fetch('/api/v1/users/user')
            const data = await response.json()
            setCurrentUser(data)
        }
        getCurrentUser()
    }, [])


    const handleLogout = async () => {
        const response = await fetch('/api/v1/users/logout')
        const data = await response.json()
        console.log(data)
        setSuccess("Logout successful. Redirecting to login...")
        setTimeout(() => {
            router.push('/login')
        }, 2000);

    }
    return (
        <>
            {currentUser && (

                <div className='flex justify-between md:flex-row flex-col gap-4 items-center'>
                    <h4 className='font-bold w-fit px-6 rounded-md'>
                        {currentUser?.data?.fullname}
                    </h4>
                    {sucess && <p className='text-green-500'>{sucess}</p>}
                    <button className='py-1 px-4 shadow-sm hover:shadow bg-[#3366CC] text-white rounded' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </>
    )
}

export default UserAccount