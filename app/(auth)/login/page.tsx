'use client';

import Image from 'next/image';
import React, { useState } from 'react'

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('')
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <main className='max-w-screen-xl m-auto flex justify-center items-center min-h-[100vh] my-4'>
            <div className='bg-gradient-to-b from-[#C2DAFF] to-[#EFF1F0] rounded-2xl shadow-md drop-shadow-sm border border-gray-50 p-5 md:p-20 lg:p-[100px]'>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className='flex justify-center mb-7'>
                        <Image src={"/logo.png"} alt="logo" width={200} height={200} />
                    </div>
                    <input required={true} type="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email Address" className="inpt" id="email" />

                    <input required={true} value={formData.password} type="password" onChange={handleChange} name="password" placeholder="Password" className="inpt" id="password" />

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default LoginPage