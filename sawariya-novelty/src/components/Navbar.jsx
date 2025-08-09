'use client';
import React from 'react'
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { UserPen, House, User, LogOut, AlignRight ,X} from "lucide-react"
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserDataContext } from './context/UserContext';
import BeautifulLoader from "@/components/Loading";

function Navbar() {
  const router = useRouter();
  const { user,setLoading,loading  } = useUserDataContext()
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { label: 'Products', href: '/dashboard/Products' },
    { label: 'Home Delivery', href: '/dashboard/delivery' },
    { label: 'About', href: '/dashboard/about' },
    { label: 'Contact', href: '/dashboard/contact' },
    { label: 'Blogs', href: '/dashboard/blogs' },
    { label: 'Pricing', href: '/dashboard/pricing' },
  
  ]
  
 
useEffect(()=>{
     const handleResize = () => {
           if (window.innerWidth >= 768) {
             setIsOpen(false);
           }
         } 
         handleResize();
         window.addEventListener('resize', handleResize);
         return () => {
           window.removeEventListener('resize', handleResize);
         }
},[])




  const Logout = async () => {
    if(!user){
      router.push("login")
    }
    deleteCookie('token');
    deleteCookie('name');
    router.push('/login')
  }
  return (
     
            
      
    <div className='w-full bg-white justify-end  flex border-b-black border-1 shadow-lg  '>
       {loading
         ? 
              <BeautifulLoader variant="spinner" fullscreen size={56} text="Loading dashboard..." />
            :
      <nav className='border-b-1 w-[100%] p-3 '>
        <div className=' flex justify-between items-center w-full   text-[#11111198]'>

          <div className='text-black  lg:w-[40%]'>
            <Link href='/dashboard'>  
              <h1 className='text-xl lg:text-4xl font-extrabold md:m-2'>Sawariya Novelty</h1>
            </Link>
          </div>

          <div className=' flex justify-between items-center ml-5 md:ml-5    font-semibold text-lg gap-4'>
              {user?.role == 'admin' && (
              <Link href='/dashboard/admin' className='hover:text-[#111111d1] w-50  font-semibold transition-colors duration-300'>
                Admin Panel
              </Link>
            )}
          </div>

          <div className=' hidden md:flex justify-between items-center w-[45%]   font-semibold text-lg gap-4'>
            {items.map((item, index) => (
              <Link key={index} href={item.href} className='hover:text-[#111111d1] transition-colors duration-300'>
                {item.label}
              </Link>
            ))}
          </div>

          <div className='hidden md:flex  justify-end items-center w-[15%] gap-2'>
            <DropdownMenu role={user?.role}
              options={[
                {
                  label: "Profile",
                  onClick: () => router.push('/dashboard/profile'),
                  Icon: <UserPen className="h-6 w-6" />,
                },
                {
                  label: user ? "Logout" : "Login",
                  onClick: () => Logout(),
                  Icon: <LogOut className="h-6 w-6" />,
                },
              ]}
            >
            </DropdownMenu>
          </div>

          <div className=' md:hidden flex justify-end items-center  gap-2 '>
            {!isOpen ? <AlignRight onClick={() => setIsOpen(!isOpen)} /> : <X onClick={() => setIsOpen(!isOpen)} />}
          </div>

          {isOpen && (
            <div className='absolute top-15 right-0 z-50 bg-white m-2 shadow-lg rounded-lg p-4 w-48'>
              < DropdownMenu role={user?.role}
                options={[

                  {
                    label: "Dashboard",
                    onClick: () => {router.push('/dashboard/admin/');setIsOpen((false))},
                    Icon: <House className="h-6 w-6" />,
                  },
                  {
                    label: "Profile",
                    onClick: () =>{ router.push('/dashboard/profile');setIsOpen((false))},
                    Icon: <UserPen className="h-6 w-6" />,
                  },
                  {
                    label: "Logout",
                    onClick: () => {Logout();setIsOpen((false))},
                    Icon: <LogOut className="h-6 w-6" />,
                  },
                ]}
              >
               Profile
              </DropdownMenu>

              <div className=' flex  flex-col justify-between items-start my-5   font-semibold text-lg gap-4'>
                  
                {items.map((item, index) => (
                  <Link key={index} href={item.href} className='hover:text-[#111111d1] transition-colors duration-300'>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )
          }
        </div>
      </nav >
        }
    </div >
    
  )
}

export default Navbar
