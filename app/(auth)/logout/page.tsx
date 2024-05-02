import Image from 'next/image'
import React from 'react'

const LogoutPage = () => {
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
                    <button type="submit" className="btn">
                        Logout
                    </button>
                </div>
            </div>
        </main>
    )
}

export default LogoutPage