'use client'

import React from "react";
import Image from "next/image";
import AnimOne from "@/components/ui/AnimOne";
import { IoMdMail } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";


const ContactUsPage = () => {
    return (
        <main>
            <div className="bg-[#3366CC] py-4 text-white px-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold uppercase">Demo Logo</h1>
                <div>
                    <input type="text" name="" id="" placeholder="Search" className="bg-white text-gray-600 px-4 py-2 rounded-md focus:outline-none max-w-[600px] min-w-[400px]" />
                </div>
            </div>

            <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
                <div>
                    <h4 className="text-3xl md:text-5xl font-bold text-gray-600 ">Contact Us</h4>
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="relative">
                            <input type="text" name="name" placeholder="Name" className="bg-gray-100 border border-gray-300 pl-10 py-2 rounded-2xl focus:outline-none w-full" id="name" />
                            <FaUserLarge className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                            <input type="email" name="email" placeholder="Email" className="bg-gray-100 border border-gray-300 pl-10 py-2 rounded-2xl focus:outline-none w-full" id="email" />
                            <IoMdMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        <textarea name="message" id="message" cols={20} rows={10} placeholder="Message" className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-2xl focus:outline-none" />
                        <button className="bg-[#3366CC] text-white px-4 py-3 rounded-xl focus:outline-none">Send Message</button>
                    </div>
                </div>
                <div>
                    <AnimOne />
                </div>
            </section>
        </main>
    );
};

export default ContactUsPage;
