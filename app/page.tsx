'use client'
import { useState } from 'react'
import PCBuilderForm from './components/PCBuilderForm'
import BuildRecommendations from './components/BuildRecommendations'
import AdSenseSlot from './components/AdSenseSlot'
import FloatingActions from './components/FloatingActions'

export default function Home() {
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [buildData, setBuildData] = useState(null)

  const handleGenerateBuild = (formData: any) => {
    setBuildData(formData)
    setShowRecommendations(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="bg-white backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-xl">StackedPC.ai</h1>
              <p className="text-gray-600 text-sm">AI-Powered PC Builder</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-100">Builder</button>
            <button className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-100">Support</button>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Left Sidebar - Thin */}
        <aside className="w-48 bg-white/[0.02] backdrop-blur-xl p-4 min-h-screen border-r border-white/5">
          <div className="space-y-4 sticky top-24">
            {/* Google AdSense Slots */}
            <AdSenseSlot width={176} height={150} slotId="sidebar-top" className="hover:scale-105 transition-transform duration-300" />
            <AdSenseSlot width={176} height={200} slotId="sidebar-mid-1" className="hover:scale-105 transition-transform duration-300" />
            <AdSenseSlot width={176} height={120} slotId="sidebar-mid-2" className="hover:scale-105 transition-transform duration-300" />
            <AdSenseSlot width={176} height={180} slotId="sidebar-bottom" className="hover:scale-105 transition-transform duration-300" />
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
        <aside className="w-48 bg-white/[0.02] backdrop-blur-xl p-4 min-h-screen border-l border-white/5">
          <div className="space-y-4 sticky top-24">
            {/* Google AdSense Slots */}
            <AdSenseSlot width={176} height={160} slotId="sidebar-right-1" className="hover:scale-105 transition-transform duration-300" />
            <AdSenseSlot width={176} height={140} slotId="sidebar-right-2" className="hover:scale-105 transition-transform duration-300" />
            <AdSenseSlot width={176} height={200} slotId="sidebar-right-3" className="hover:scale-105 transition-transform duration-300" />
            <AdSenseSlot width={176} height={120} slotId="sidebar-right-4" className="hover:scale-105 transition-transform duration-300" />
          </div>
        </aside>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActions />
    </main>
  )
}
