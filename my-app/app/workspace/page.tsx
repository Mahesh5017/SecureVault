import React from 'react'
import { Sidebar } from '@/components/ui/sidebar'
import PasswordGenerator from '../components/PasswordGenerator'
const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <PasswordGenerator />
      </div>
    </div>
  )
}

export default page;
