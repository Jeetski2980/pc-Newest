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
    <main className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold">StackedPCai</h1>
              <p className="text-gray-400 text-xs">AI-Powered PC Builder</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white">Builder</button>
            <button className="text-gray-300 hover:text-white">Support</button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!showRecommendations ? (
          <PCBuilderForm onGenerate={handleGenerateBuild} />
        ) : (
          <BuildRecommendations buildData={buildData} onBack={() => setShowRecommendations(false)} />
        )}
      </div>
    </main>
  )
}
