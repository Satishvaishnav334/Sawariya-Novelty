'use client';
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import { useUserDataContext } from '@/components/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
function Page() {
  const { products} = useUserDataContext()
  const router = useRouter()

 
  return (
    <div className='flex flex-col w-full p-5 items-start '>
      <div className='bg-gray-200 flex flex-col justify-start  m-4 rounded-2xl shadow-md  p-8'>
        <h1 className='text-2xl text-center lg:text-3xl font-extrabold md:m-2'> 🙏 नमस्ते!  <span className='text-orange-600 '><HindiGreeting /></span></h1>
      </div>
      <div className='w-full flex flex-col justify-center  m-4 rounded-2xl   p-10'>
        <h1 className='text-2xl text-center lg:text-5xl font-extrabold md:m-2'> Wellcome To <span className='text-orange-600 '>Sawariya Novelty</span></h1>
      </div>
       <div className="min-h-screen w-full px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Product Catalog</h1>

      {products?.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={product?.images?.[0]?.url || '/placeholder.png'}
                alt={product?.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{product?.category?.name || 'Uncategorized'}</p>
                <div className="mt-2 text-lg font-bold text-green-600">₹{product.price}</div>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Added on: {FormatDate(product.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default Page

function FormatDate(dateString) {
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
  }, [hour])

  return <span>
    {emoji} {timeGreeting}
  </span>
}
