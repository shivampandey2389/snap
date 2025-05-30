import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className="sign-in">
      <aside className='testimonial'>
        <Link href="/">
        <Image src="/assets/icons/logo.svg" alt='logo' width={32} height={32}/>
        <h1>SnapCast</h1>
        </Link>

        <div className="description">
          <section>
            <figure>
              {
                Array.from({length :5}).map((_,index)=>(
                  <Image src="/assets/icons/star.svg" alt='star' width={20} height={20} key={index}/>
                ))
              }
            </figure>
            <p>
              SnapCast make screen recording easy.From quick walkthrough to full presentation,it's fast,smooth,and shareable in seconds
            </p>

          </section>
        </div>
            <p>©Snapcast {(new Date()).getFullYear()}</p>
      </aside>
      <aside className='google-sign-in'>
            <section>
                <Link href="/">
                <Image src="/assets/icons/logo.svg" alt='logo' width={40} height={40}/>
                <h1>SnapCast</h1>
                </Link>
                <p>Create and share your first <span>SnapCast video</span> in no time!</p>
                <button>
                  <Image src="/assets/icons/google.svg" alt='google' height={22} width={22}/>
                  <span>Sign in with Google</span>
                </button>
            </section>
      </aside>
      <div className="overlay"/>
    </main>
  )
}

export default page