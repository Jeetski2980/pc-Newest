'use client'
import { LucideIcon, ExternalLink } from 'lucide-react'
import { useState } from 'react'

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
  const [isHovered, setIsHovered] = useState(false)
  const [selectedForBuild, setSelectedForBuild] = useState(false)

  const openAmazonLink = () => {
    // Create a realistic Amazon search URL
    const searchQuery = encodeURIComponent(`${name} ${type}`)
    const amazonUrl = `https://www.amazon.com/s?k=${searchQuery}&ref=nb_sb_noss`
    window.open(amazonUrl, '_blank', 'noopener,noreferrer')
  }

  const openNeweggLink = () => {
    // Create a realistic Newegg search URL
    const searchQuery = encodeURIComponent(`${name} ${type}`)
    const neweggUrl = `https://www.newegg.com/p/pl?d=${searchQuery}`
    window.open(neweggUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`bg-white/[0.03] backdrop-blur-xl rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border ${
        selectedForBuild
          ? 'border-emerald-400/50 shadow-emerald-400/20 bg-emerald-400/5'
          : isHovered
            ? 'border-blue-400/50 shadow-blue-400/20'
            : 'border-white/10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className={`w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
            isHovered ? 'scale-110 rotate-6 shadow-blue-400/25' : 'shadow-blue-400/10'
          }`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full uppercase tracking-wide">
                {type}
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2 text-lg">{name}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-white mb-1">{price}</div>
            <div className="text-xs text-slate-400">Best Price</div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={openAmazonLink}
              className="group bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 min-w-[100px] justify-center shadow-lg hover:shadow-orange-400/25 hover:scale-105"
            >
              <span>Amazon</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={openNeweggLink}
              className="group bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 min-w-[100px] justify-center shadow-lg hover:shadow-blue-400/25 hover:scale-105"
            >
              <span>Newegg</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="ml-4">
            <button
              onClick={() => setSelectedForBuild(!selectedForBuild)}
              className={`w-14 h-8 rounded-full relative transition-all duration-300 cursor-pointer ${
                selectedForBuild
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-400/25'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                selectedForBuild ? 'left-7' : 'left-1'
              }`}></div>
            </button>
            <div className="text-xs text-slate-400 mt-1 text-center">
              {selectedForBuild ? 'Selected' : 'Select'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
