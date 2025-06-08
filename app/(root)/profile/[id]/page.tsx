import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import { dummyCards } from '@/constants';
import React from 'react'

const page = async({params}:ParamsWithSearch) => {
  const {id}= await params;
  return (
    <div className='wrapper page'>
      <Header subHeader='shivampandey2389@gmail.com' title='Shivam' userImg='/assets/images/dummy.jpg'/>
       <section className='video-grid'>
        
      {
        dummyCards.map((cards)=>(
          <VideoCard key={cards.id} {...cards}/>
        ))
      }
      </section>
      </div>
  )
}

export default page