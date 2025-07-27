'use client'
import { useState } from 'react'
import PCBuilderForm from './components/PCBuilderForm'
import BuildRecommendations from './components/BuildRecommendations'

export default function Home() {
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [buildData, setBuildData] = useState(null)

  const handleGenerateBuild = (formData: any) => {
    setBuildData(formData)
    setShowRecommendations(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">StackedPC.ai</h1>
              <p className="text-gray-400 text-sm">AI-Powered PC Builder</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-700/50">Builder</button>
            <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-700/50">Support</button>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Left Sidebar - Thin */}
        <aside className="w-48 bg-gray-800/50 backdrop-blur-sm p-4 min-h-screen border-r border-gray-700/30">
          <div className="space-y-4 sticky top-24">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">GPU Deals</h3>
              <p className="text-purple-100 text-xs">RTX 4080 - 20% OFF</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">AMD Specials</h3>
              <p className="text-blue-100 text-xs">Ryzen 7000 Series</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">SSD Deals</h3>
              <p className="text-green-100 text-xs">NVMe 2TB - 30% OFF</p>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">RAM Sale</h3>
              <p className="text-orange-100 text-xs">DDR5 32GB Kit</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8">
          {!showRecommendations ? (
            <PCBuilderForm onGenerate={handleGenerateBuild} />
          ) : (
            <BuildRecommendations buildData={buildData} onBack={() => setShowRecommendations(false)} />
          )}
        </div>

        {/* Right Sidebar - Thin */}
        <aside className="w-48 bg-gray-800/50 backdrop-blur-sm p-4 min-h-screen border-l border-gray-700/30">
          <div className="space-y-4 sticky top-24">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">Build Guide</h3>
              <p className="text-indigo-100 text-xs">Step-by-Step Tutorial</p>
            </div>

            <div className="bg-gradient-to-br from-teal-600 to-blue-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">Price Tracker</h3>
              <p className="text-teal-100 text-xs">Set Price Alerts</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">Reviews</h3>
              <p className="text-yellow-100 text-xs">Latest Component Reviews</p>
            </div>

            <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold text-sm mb-2">Community</h3>
              <p className="text-pink-100 text-xs">Join PC Builders</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
