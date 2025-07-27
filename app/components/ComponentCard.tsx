'use client'
import { LucideIcon } from 'lucide-react'

interface ComponentCardProps {
  type: string
  icon: LucideIcon
  name: string
  description: string
  price: string
  amazonLink: string
  neweggLink: string
}

export default function ComponentCard({ 
  type, 
  icon: Icon, 
  name, 
  description, 
  price, 
  amazonLink, 
  neweggLink 
}: ComponentCardProps) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-white font-semibold">{type}</h3>
          </div>
          <h4 className="text-white font-medium mb-1">{name}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="text-right mr-4">
          <div className="text-white font-semibold">{price}</div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Amazon
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Newegg
          </button>
        </div>
        <div className="ml-4">
          <div className="w-12 h-6 bg-gray-600 rounded-full relative">
            <div className="w-5 h-5 bg-gray-400 rounded-full absolute top-0.5 left-0.5"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
