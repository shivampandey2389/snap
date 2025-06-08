"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

export const Navbar = () => {
  const user ={};
  const router = useRouter();
  return (
    <header className='navbar'>
      <nav>
        <Link href="/">
            <Image src="/assets/icons/logo.svg" alt='logo'  height={32} width={32}/>
            <h1>SayScreen</h1>
        </Link>

        {
          user && (
            <figure >
              <button onClick={()=>router.push('/profile/12233')}>
                <Image src="/assets/images/dummy.jpg" className='rounded-full aspect-square' alt='dummy' height={36} width={36}/>
                
              </button>
              <button className='cursor-pointer'>
                <Image src="/assets/icons/logout.svg" className='rotate-180' alt='logout' height={23} width={24} />
              </button>
            </figure>
          )
        }

      </nav>
    </header>
  )
}
