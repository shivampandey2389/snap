'use client'
import Image from "next/image";
import { useState } from "react"

const Dropdownlist = () => {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={()=>setIsOpen(!isOpen)} className="cursor-pointer">
        <div className="filter-trigger">
          <figure>
            <Image src="/assets/icons/hamburger.svg" alt="menu" width={14} height={14}/>
            Most Recent
          </figure>
          <Image src="/assets/icons/arrow-down.svg" alt="arrow-down" width={20} height={20}/>
        </div>
      </div>
      {
        isOpen && (
          <ul className="dropdown">
            {['Most recent','Most liked'].map((option)=>(
              <li key={option} className="list-item">
                {option}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default Dropdownlist