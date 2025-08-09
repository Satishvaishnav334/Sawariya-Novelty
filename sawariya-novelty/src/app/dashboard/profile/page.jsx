'use client';
import React, { useEffect } from 'react'
import { useUserDataContext } from '@/components/context/UserContext';
import { useRouter } from 'next/navigation';
function Page() {
  const { user, refresh } = useUserDataContext()
  const router = useRouter()
  useEffect(()=>{
     if(!user){
        router.push('/login')
    }
  },[user])
  return (
    <div className='flex justify-center items-center h-[90vh] '>
      <div className='bg-green-300 flex flex-col justify-center  rounded-2xl shadow-xl h-[80%] w-[50%] p-20'>
        <h1 className='text-2xl text-center lg:text-6xl font-extrabold md:m-2'> name : {user?.name}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'> Email : {user?.email}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'>Role : {user?.role}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'>Joing Date : {formatDate(user?.createdAt)}</h1>
      </div>
    </div>
  )
}

export default Page

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: '2-digit',
    // hour12: true
  });
}