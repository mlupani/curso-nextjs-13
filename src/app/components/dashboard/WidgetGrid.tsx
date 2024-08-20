'use client'

import { SimpleWidget } from './SimpleWidget'
import { useAppSelector } from '@/store'
import { IoCartOutline } from 'react-icons/io5'

export const WidgetGrid = () => {

  const counter = useAppSelector((state) => state.counter.count);

  return (
    <div className="flex flex-wrap p-2 items-center justify-center mt-4">
        <SimpleWidget
          icon={<IoCartOutline size={50} className='text-blue-500' />}
          title={counter.toString()}
          subtitle='Productos agregados'
          label="Contador"
          href="/dashboard/counter"
        />
    </div>
  )
}