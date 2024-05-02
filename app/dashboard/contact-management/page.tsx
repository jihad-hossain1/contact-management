'use client'

import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutgoingMail } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const ContactManagementPage = () => {
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.ceil(totalCount / limit);
    const [totalData, setTotalData] = useState([])

    const updatePageNumber = (num: number) => {
        if (num >= 0 && num < totalPages) {
            setPage(num + 1);
        }
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getContacts() {
            setLoading(true)
            const response = await fetch(`/api/v1/contacts?page=${page}&pageSize=${limit}&searchTerm=${search}&sortBy=createdAt&sortOrder=asc`)
            const data = await response.json()
            setContacts(data?.data)
            setTotalCount(data?.total)
            setTotalData(data?.allData)
            setLoading(false)
        }
        getContacts()
    }, [limit, page, search])

    useEffect(() => {
        async function getCurrentUser() {
            const response = await fetch('/api/v1/users/user')
            const data = await response.json()
            setCurrentUser(data)
        }
        getCurrentUser()
    }, [])


    const handleClearSearch = () => {
        setSearch("");
    };


    function generatePDFContent(data: { name: string; email: string; mobile: string; message: string; }[]) {
        let content = '<h1 style="text-align: center; color: #333;">Contact List</h1>';
        content += '<table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">';
        content += '<tr style="background-color: #f2f2f2;">';
        content += '<th style="border: 1px solid #ddd; padding: 8px;">No.</th>';
        content += '<th style="border: 1px solid #ddd; padding: 8px;">Contact Name</th>';
        content += '<th style="border: 1px solid #ddd; padding: 8px;">Email</th>';
        content += '<th style="border: 1px solid #ddd; padding: 8px;">Mobile</th>';
        content += '<th style="border: 1px solid #ddd; padding: 8px;">Message</th>';
        content += '</tr>';

        data.forEach((item: { name: string; email: string; mobile: string; message: string }, index: number) => {
            content += '<tr>';
            content += `<td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>`;
            content += `<td style="border: 1px solid #ddd; padding: 8px;">${item?.name}</td>`;
            content += `<td style="border: 1px solid #ddd; padding: 8px;">${item?.email}</td>`;
            content += `<td style="border: 1px solid #ddd; padding: 8px;">${item?.mobile || "01779090909"}</td>`;
            content += `<td style="border: 1px solid #ddd; padding: 8px;">${item?.message?.slice(0, 20)}</td>`;
            content += '</tr>';
        });

        content += '</table>';
        return content;
    }

    function downloadPDF(pdfContent: string) {
        const iframe: HTMLIFrameElement = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        const iframeDoc = iframe.contentDocument;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(pdfContent);
            iframeDoc.close();
            iframe.contentWindow?.print();
        } else {
            console.error("Failed to get iframe document");
        }
        document.body.removeChild(iframe);
    }

    const handleDownload = () => {
        const pdfContent = generatePDFContent(totalData);
        downloadPDF(pdfContent);
    };

    return (
        <div className='max-w-screen-xl mx-auto p-2 my-10'>
            <div className='flex flex-col md:flex-row md:justify-between gap-4'>
                <div className='flex gap-4'>
                    <FaListUl className='text-3xl' />
                    <h1 className="text-xl md:text-3xl font-bold text-[#3366CC]">Contact Management</h1>
                </div>
                <div className='flex items-center gap-3'>

                    <div className='relative'>
                        <input type="text" value={search} placeholder="Search by name or email ...." className="inpt" onChange={(e) => setSearch(e.target.value)} />
                        {!search && <FaMagnifyingGlass className="absolute top-1/2 right-10 -translate-y-1/2 text-[#3366CC]" onClick={handleClearSearch} />}

                        {search && <button onClick={handleClearSearch} className="absolute top-1/2 right-10 -translate-y-1/2 bg-red-500 px-2 rounded-md text-white">clear</button>}
                    </div>

                    <div>
                        <button onClick={handleDownload} className="bg-[#3366CC] px-4 py-2 rounded-md text-white">Export Data</button>
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
                            loading ? <tr className='flex flex-col justify-center items-center min-h-[60vh]'>{"Loading..."}</tr> : contacts?.length > 0 ? contacts?.map((item: { name: string, phone: string, email: string }, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-b transition duration-300">
                                    <td className="py-4 px-6 border-b  text-center border-r border-gray-50">
                                        {item?.name}
                                    </td>
                                    <td className="py-4 px-6 border-b text-center border-r border-gray-50 ">01779-090909</td>
                                    <td className="py-4 px-6 border-b text-center border-r border-gray-50 ">
                                        {item?.email}
                                    </td>
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
                            )) : <tr className='flex flex-col justify-center items-center min-h-[60vh]'>{"No data found"}</tr>
                        }

                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div className="flex select-none justify-center items-center gap-3 mb-3">
                        {/* left arrow */}
                        <div onClick={() => updatePageNumber(page - 2)}>
                            <MdKeyboardArrowLeft
                                className={`hover:scale-110 scale-100 transition-all duration-300 ease-in-out cursor-pointer p-2 text-5xl text-blue-500 hover:bg-blue-500 hover:text-white rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            />
                        </div>

                        <div className="flex justify-center items-center gap-3 px-8 py-3 rounded-full">
                            {[...Array(totalPages).keys()]?.map((item) => (
                                <div
                                    onClick={() => updatePageNumber(item)}
                                    className={`cursor-pointer hover:scale-110 text-base scale-100 transition-all duration-200 p-3 ${page === item + 1
                                        ? "bg-blue-500 text-white"
                                        : "text-blue-500 hover:bg-blue-500 hover:text-white"
                                        } border-sky-300 font-semibold text-gray-700 py-[6px] rounded-full`}
                                    key={item}
                                >
                                    {item + 1}
                                </div>
                            ))}
                        </div>
                        {/* right arrow */}
                        <div onClick={() => updatePageNumber(page)}>
                            <MdKeyboardArrowRight
                                className={`hover:scale-110 scale-100 transition-all duration-300 ease-in-out cursor-pointer p-2 text-5xl text-blue-500 hover:bg-blue-500 hover:text-white rounded-full ${page === totalPages
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                    }`}
                            />
                        </div>
                    </div>
                )}
            </div>


        </div>
    )
}

export default ContactManagementPage