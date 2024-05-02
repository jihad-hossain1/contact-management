'use client'

import React from "react";
import AnimOne from "@/components/ui/AnimOne";
import { IoMdMail } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import Link from "next/link";



const ContactUsPage = () => {
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch('/api/v1/contacts', {
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
                setSuccess('Thank you for your message!');
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
                setErrors('');
                setTimeout(() => {
                    setSuccess('');
                }, 3000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <div className=" bg-[#3366CC] py-4 text-white px-6 flex flex-col gap-2 md:justify-between md:items-center md:flex-row">
                <Link href={"/"} className="text-3xl font-bold uppercase">Demo Logo</Link>
                <div>
                    <input type="text" name="" id="" placeholder="Search" className="bg-white text-gray-600 px-4 py-2 rounded-md focus:outline-none md:max-w-[600px] md:min-w-[400px]" />
                </div>
            </div>

            <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
                <form onSubmit={handleSubmit}>
                    <h4 className="text-3xl md:text-5xl font-bold text-gray-600 ">Contact Us</h4>

                    <div className="mt-8 flex flex-col gap-4">
                        {errors && <p className="text-red-500">{errors}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        <div className="relative">
                            <input type="text" name="name" placeholder="Name" className="bg-gray-100 border border-gray-300 pl-10 py-2 rounded-2xl focus:outline-none w-full" value={formData.name} id="name" onChange={handleChange} />
                            <FaUserLarge className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                            <input type="email" value={formData.email} name="email" placeholder="Email" className="bg-gray-100 border border-gray-300 pl-10 py-2 rounded-2xl focus:outline-none w-full" id="email" onChange={handleChange} />
                            <IoMdMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <textarea value={formData.message} onChange={handleChange} name="message" id="message" cols={20} rows={10} placeholder="Message" className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-2xl focus:outline-none" />
                        <button type="submit" className="bg-[#3366CC] text-white px-4 py-3 rounded-xl focus:outline-none" disabled={loading}>
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
                <div>
                    <AnimOne />
                </div>
            </section>
        </main>
    );
};

export default ContactUsPage;
