import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoMdMail } from "react-icons/io";


const DashboardLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main className='flex gap-3'>
            <aside className='w-1/6 bg-gray-200 p-3 min-h-screen'>
                <div className='flex justify-center bg-slate-50 py-2'>
                    <Image src={"/logo.png"} alt="logo" width={100} height={100} />
                </div>
                <Link href={'/dashboard/contact-management'} className='flex items-center gap-2 my-3 text-nowrap'>
                    <IoMdMail />
                    <span>
                        Contact Management
                    </span>
                </Link>
            </aside>
            <div>{children}</div>
        </main>
    )
}

export default DashboardLayout