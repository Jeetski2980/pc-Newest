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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <div className="bg-gray-800 rounded-xl p-6 h-fit">
          <div className="text-center mb-6">
            <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">AI-Spec</h3>
            <p className="text-gray-400 text-sm">BUILDER</p>
          </div>
          <p className="text-gray-400 text-sm text-center">
            A.I. professional GPU/video specs for maximum value
          </p>
        </div>

        {/* Main form */}
        <div className="bg-gray-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Build Your Perfect PC</h2>
            <p className="text-gray-400">AI-powered recommendations tailored to your needs and budget</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Budget */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Budget (USD)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="2500"
              />
            </div>

            {/* Primary Use Case */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                Primary Use Case
              </label>
              <select
                value={primaryUse}
                onChange={(e) => setPrimaryUse(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
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
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Europe</option>
                <option>Australia</option>
              </select>
            </div>

            {/* Preferences */}
            <div>
              <label className="flex items-center text-white font-medium mb-3">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
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
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      preferences[key as keyof typeof preferences]
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
                <input type="checkbox" className="mr-2" />
                Additional Requirements (Optional)
              </label>
              <textarea
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-24 resize-none"
                placeholder="Make the outside black and white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Star className="w-5 h-5 mr-2" />
              Generate My PC Build
            </button>
          </form>
        </div>

        {/* Right sidebar */}
        <div className="bg-gray-800 rounded-xl p-6 h-fit">
          <div className="text-center mb-6">
            <Monitor className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">Advertisement</h3>
            <p className="text-gray-400 text-sm">SIDEBAR</p>
          </div>
          <p className="text-gray-400 text-sm text-center">
            Coming soon with advanced features
          </p>
        </div>
      </div>
    </div>
  )
}
