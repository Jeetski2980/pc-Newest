'use client'
import { useState } from 'react'

interface AdSenseSlotProps {
  width: number
  height: number
  slotId?: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
}

export default function AdSenseSlot({ 
  width, 
  height, 
  slotId = 'demo-slot', 
  format = 'auto',
  className = '' 
}: AdSenseSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div 
      className={`relative overflow-hidden rounded-xl border border-slate-200/10 bg-slate-800/30 backdrop-blur-sm ${className}`}
      style={{ width, height }}
    >
      {/* AdSense placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mb-3">
          <span className="text-white text-xs font-bold">Ad</span>
        </div>
        <div className="text-center">
          <p className="text-slate-300 text-xs font-medium mb-1">Advertisement</p>
          <p className="text-slate-400 text-[10px]">Google AdSense</p>
          <p className="text-slate-500 text-[9px] mt-1">{width}×{height}</p>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Actual AdSense integration would go here */}
      {/* 
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-xxxxxxxxxx"
           data-ad-slot={slotId}
           data-ad-format={format}
           data-full-width-responsive="true" />
      */}
    </div>
  )
}
