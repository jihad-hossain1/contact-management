'use client'

import { UserTypeResponse } from '@/helpers/interface'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserAccount = () => {
    const [currentUser, setCurrentUser] = useState<UserTypeResponse>()

    useEffect(() => {
        async function getCurrentUser() {
            const response = await fetch('/api/v1/users/user')
            const data = await response.json()
            setCurrentUser(data)
        }
        getCurrentUser()
    }, [])



    return (
        <>
            {currentUser && (

                <div className='flex justify-between md:flex-row flex-col gap-4 items-center'>
                    <h4 className='font-bold w-fit px-6 rounded-md'>
                        {currentUser?.data?.fullname}
                    </h4>
                    <Link href={'/logout'} className='bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600'>Logout</Link>
                </div>
            )}
        </>
    )
}

export default UserAccount