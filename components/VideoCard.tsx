'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const VideoCard = ({
  id,
  title,
  thumbnail,
  createdAt,
  userImg,
  username,
  views,
  visibility,
  duration

}:VideoCardProps) => {
  return (
    <Link href={`/video/${id}`} className='video-card'>
      <Image src={thumbnail} alt='thumbnail' width={290} height={160} className='thumbnail'/>
      <article>
        <div>
          <figure>
            <Image src={userImg || "assets/images/dummy.jpg"} alt='avatar' className='rounded-full aspect-square' width={34} height={34}/>
            <figcaption>
              <h3>{username}</h3>
              <p>{visibility}</p>
            </figcaption>
          </figure>
          <aside>
            <Image src="/assets/icons/eye.svg" alt='eye' height={16} width={16}/>
            <span>{views}</span>
          </aside>
        </div>
        <h2>{title} - {" "} {createdAt.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}</h2>
      </article>
      <button className="copy-btn" onClick={()=>{}}>
        <Image src="/assets/icons/link.svg" alt='link' height={18} width={18}/>
      </button>

      {
        duration && (
          <div className='duration'>
            {Math.ceil(duration/60)}min
          </div>
        )
      }
    </Link>
  )
}

export default VideoCard