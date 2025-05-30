import Header from '@/components/Header';
import React from 'react'

const page = async({params}:ParamsWithSearch) => {
  const {id }= await params;
  return (
    <div className='wrapper page'>
      <Header subHeader='shivampandey2389@gmail.com' title='Shivam' userImg='/assets/images/dummy.jpg'/>
      <h1 className='text-2xl font-karla'>
      User id: {id}
      </h1>
      </div>
  )
}

export default page