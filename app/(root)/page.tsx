import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { dummyCards } from '@/constants'
import React from 'react'

const page = () => {
  return (
    <main className='wrapper page'>
      <Header title='All Videos' subHeader='Public Library'/>
      <h1 className='text-2xl font-karla'>Welcome to SnapCast</h1>
      <section className='video-grid'>
        
      {
        dummyCards.map((cards)=>(
          <VideoCard key={cards.id} {...cards}/>
        ))
      }
      </section>
    </main>
  )
}

export default page;