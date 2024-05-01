import React from 'react'
import { FaTrash } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const ContactManagementPage = () => {
    return (
        <div className='max-w-screen-xl mx-auto p-2 my-10'>
            <div className='flex flex-col md:flex-row md:justify-between gap-4'>
                <div className='flex gap-4'>
                    <FaListUl className='text-3xl' />
                    <h1 className="text-xl md:text-3xl font-bold text-[#3366CC]">Contact Management</h1>
                </div>
                <div className='relative'>
                    <input type="text" placeholder="Search" className="inpt" />
                    <div className='absolute top-1/2 right-3 -translate-y-1/2 bg-[#3366CC] p-3 rounded-md'>
                        <FaMagnifyingGlass className='text-white' />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full lg:w-[1000px] bg-slate-200 shadow-md border mx-auto border-gray-100 my-6 text-nowrap">
                    <thead>
                        <tr className="bg-[#3366CC] text-white">
                            <th className="py-4 px-6 text-center border-b border-r border-gray-50">Name</th>
                            <th className="py-4 px-6 text-center border-b border-r border-gray-50">Phone Number</th>
                            <th className="py-4 px-6 text-center border-b border-r border-gray-50">Email Address</th>
                            <th className="py-4 px-6 border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...Array(20)].map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-b transition duration-300">
                                    <td className="py-4 px-6 border-b  text-center border-r border-gray-50">
                                        Samsung
                                    </td>
                                    <td className="py-4 px-6 border-b text-center border-r border-gray-50 ">Samsung s22</td>
                                    <td className="py-4 px-6 border-b text-center border-r border-gray-50 ">$599.99</td>
                                    <td className="py-4 px-6 border-b flex flex-col items-center border-gray-50">
                                        <div className='flex gap-2'>
                                            <button className='h-7 w-7 border border-white rounded-full flex justify-center items-center'>
                                                <MdOutgoingMail className='text-cyan-600' />
                                            </button>
                                            <button className='h-7 w-7 border border-white rounded-full flex justify-center items-center'>
                                                <FaTrash className='text-red-600' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ContactManagementPage