"use cl"
import EmptyState from '@/components/EmptyState'
import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import { dummyCards } from '@/constants'
import { getAllVideos } from '@/lib/actions/video'
import React from 'react'

const page = async({searchParams}:SearchParams) => {
  const {query,filter,page} = await searchParams;
  const {videos,pagination}= await getAllVideos(query,filter,Number(page)||1)
  return (
    <main className='wrapper page'>
      <Header title='All Videos' subHeader='Public Library'/>
      <section className='video-grid'>
        
      {
        videos?.length > 2?
        (
          <section className='video-grid'>
              {videos[0].video.title}
          </section>
        ):(
          <EmptyState
          icon="/assets/icons/video.svg"
          title="No Videos Found"
          description="Try adjusting your search."
        />
        )
      }
      </section>
    </main>
  )
}

export default page;