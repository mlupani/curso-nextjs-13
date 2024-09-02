'use client';

import { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'

interface Props {
    totalItems: number;
}

const CantItems = ({totalItems}: Props) => {

  const [style, setStyle] = useState('bg-red-600');

  useEffect(() => {
    setStyle('bg-blue-600');
    setTimeout(() => {
        setStyle('bg-red-600');
    }, 500);
  }, [totalItems])
  

  return (
    <button className="flex items-center justify-center h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
    {
        totalItems > 0 && (
        <span className={'p-2 w-10 mr-2 text-white  rounded-full text-sm '+style} >{totalItems}</span>
        )
    }
    <IoCartOutline size={25} />
    </button>
  )
}

export default CantItems