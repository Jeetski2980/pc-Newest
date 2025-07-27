'use client'
import { useState, useEffect } from 'react'
import { MessageCircle, Lightbulb, Settings, ChevronUp } from 'lucide-react'

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Expanded Action Buttons */}
        {isExpanded && (
          <div className="flex flex-col space-y-3 animate-in slide-in-from-bottom-4 duration-300">
            <button className="group bg-blue-400/20 backdrop-blur-xl hover:bg-blue-400/30 border border-blue-400/30 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg">
              <Lightbulb className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            </button>
            <button className="group bg-purple-400/20 backdrop-blur-xl hover:bg-purple-400/30 border border-purple-400/30 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg">
              <Settings className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
            </button>
            <button className="group bg-emerald-400/20 backdrop-blur-xl hover:bg-emerald-400/30 border border-emerald-400/30 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg">
              <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
            </button>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-slate-700/80 backdrop-blur-xl hover:bg-slate-600/80 border border-white/10 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg animate-in slide-in-from-bottom-2"
          >
            <ChevronUp className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-blue-400/25 ${
            isExpanded ? 'rotate-45' : ''
          }`}
        >
          <div className="relative">
            <div className={`transition-all duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
              <div className="w-6 h-0.5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="w-0.5 h-6 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
