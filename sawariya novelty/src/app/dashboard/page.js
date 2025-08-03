'use client';
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import { useUserDataContext } from '@/components/context/UserContext';
import { useRouter } from 'next/navigation';
function page() {
  const { user, refresh } = useUserDataContext()
  const router = useRouter()
  return (
    <div className='flex flex-col w-full p-5 items-start '>
      <div className='bg-gray-200 flex flex-col justify-start  m-4 rounded-2xl shadow-md  p-8'>
        <h1 className='text-2xl text-center lg:text-3xl font-extrabold md:m-2'> 🙏 नमस्ते!  <span className='text-orange-600 '><HindiGreeting /></span></h1>
      </div>
      <div className='w-full flex flex-col justify-center  m-4 rounded-2xl   p-10'>
        <h1 className='text-2xl text-center lg:text-5xl font-extrabold md:m-2'> Wellcome To <span className='text-orange-600 '>Sawariya Novelty</span></h1>
      </div>
      <div className='flex w-full justify-between gap-5 my-5'>
       
      </div>
    </div>
  )
}

export default page

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function HindiGreeting() {
  const now = new Date();
  const hour = now.getHours();

  const [timeGreeting, settimeGreeting] = useState('')
  const [emoji, setemoji] = useState('')
    ;

  useEffect(() => {
    if (hour >= 5 && hour < 12) {
      settimeGreeting('Good Morning');
     
      setemoji('🌅');
    } else if (hour >= 12 && hour < 17) {
      settimeGreeting('Good Afternoon');
     
      setemoji('☀️');
    } else if (hour >= 17 && hour < 21) {
      settimeGreeting('Good Evening');
      setemoji('🌇');

    } else {
      settimeGreeting('Good Night');
      ('शुभ रात्रि');
      setemoji('🌙');

    }
  }, [])

  return <span>
    {emoji} {timeGreeting}
  </span>
}
