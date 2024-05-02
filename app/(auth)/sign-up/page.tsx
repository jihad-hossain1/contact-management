'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch('/api/v1/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json();


            if (!response.ok) {
                setLoading(false);
                setErrors(result.error);
            }

            if (response.ok) {
                setLoading(false);
                setSuccess('Sign up successful. Please login.');
                setFormData({
                    fullname: "",
                    email: "",
                    password: ""
                })
                setErrors('');
                setLoading(true);
                router.push('/login');
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main className='max-w-screen-xl m-auto flex justify-center items-center min-h-[80vh] my-4'>
            <div className='bg-gradient-to-b from-[#C2DAFF] to-[#EFF1F0] rounded-2xl shadow-md drop-shadow-sm border border-gray-50 p-5 md:p-20 lg:p-[80px]'>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className='flex justify-center mb-7'>
                        <Image src={"/logo.png"} alt="logo" width={200} height={200} />
                    </div>
                    <div>
                        {errors && <p className='text-red-500'>{errors}</p>}
                        {success && <p className='text-green-500'>{success}</p>}
                    </div>
                    <input required={true} type="text" value={formData.fullname} onChange={handleChange} name="fullname" placeholder="Full Name" className="inpt" id="fullname" />

                    <input required={true} type="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email Address" className="inpt" id="email" />

                    <input required={true} value={formData.password} type="password" onChange={handleChange} name="password" placeholder="Password" className="inpt" id="password" />

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Loading..." : "Signup"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default SignUpPage