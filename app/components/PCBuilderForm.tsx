'use client'
import { useState } from 'react'
import { Star, Cpu, Monitor, Settings } from 'lucide-react'

interface PCBuilderFormProps {
  onGenerate: (data: any) => void
}

export default function PCBuilderForm({ onGenerate }: PCBuilderFormProps) {
  const [budget, setBudget] = useState('2500')
  const [primaryUse, setPrimaryUse] = useState('Video Editing')
  const [region, setRegion] = useState('United States')
  const [preferences, setPreferences] = useState({
    rgbLighting: false,
    compactSize: false,
    quietOperation: false,
    overclockingReady: false,
    futureProof: false,
    onboardWifi: false,
    allWhiteTheme: false,
    maximumAirflow: false,
    preferAmd: false,
    preferIntelNvidia: false
  })
  const [additionalRequirements, setAdditionalRequirements] = useState('')

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate budget range
    const budgetNum = parseInt(budget)
    if (budgetNum < 350 || budgetNum > 10000) {
      alert('Budget must be between $350 and $10,000')
      return
    }

    onGenerate({
      budget,
      primaryUse,
      region,
      preferences,
      additionalRequirements
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main form - now full width */}
      <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-400/25">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Build Your Perfect PC
          </h2>
          <p className="text-slate-300 text-lg">AI-powered recommendations tailored to your needs and budget</p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Budget */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2 shadow-sm"></span>
                Budget (USD)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min="350"
                max="10000"
                className="w-full bg-white/5 backdrop-blur-sm text-white px-4 py-4 rounded-xl border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 shadow-lg placeholder:text-slate-400"
                placeholder="2500"
              />
              <p className="text-slate-400 text-sm mt-2">Budget range: $350 - $10,000</p>
            </div>

            {/* Primary Use Case */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full mr-2 shadow-sm"></span>
                Primary Use Case
              </label>
              <select
                value={primaryUse}
                onChange={(e) => setPrimaryUse(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm text-white px-4 py-4 rounded-xl border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 shadow-lg"
              >
                <option>Video Editing</option>
                <option>Gaming</option>
                <option>3D Rendering</option>
                <option>Programming</option>
                <option>Office Work</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mr-2 shadow-sm"></span>
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm text-white px-4 py-4 rounded-xl border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200 shadow-lg"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>

            {/* Preferences */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full mr-2 shadow-sm"></span>
                Preferences (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries({
                  rgbLighting: 'RGB Lighting',
                  compactSize: 'Compact Size',
                  quietOperation: 'Quiet Operation',
                  overclockingReady: 'Overclocking Ready',
                  futureProof: 'Future-Proof',
                  onboardWifi: 'Onboard WiFi/Bluetooth',
                  allWhiteTheme: 'All-White Theme',
                  maximumAirflow: 'Maximum Airflow',
                  preferAmd: 'Prefer AMD',
                  preferIntelNvidia: 'Prefer Intel/Nvidia'
                }).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handlePreferenceChange(key)}
                    className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:scale-105 cursor-pointer ${
                      preferences[key as keyof typeof preferences]
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-blue-400/25'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full mr-2 shadow-sm"></span>
                Additional Requirements (Optional)
              </label>
              <textarea
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm text-white px-4 py-4 rounded-xl border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none h-28 resize-none transition-all duration-200 shadow-lg placeholder:text-slate-400"
                placeholder="Make the outside black and white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white py-5 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center shadow-2xl hover:shadow-blue-400/25 hover:scale-[1.02] transform cursor-pointer"
            >
              <Star className="w-6 h-6 mr-3" />
              Generate My PC Build
            </button>
          </form>
        </div>
    </div>
  )
}
