'use client'
import { Star, ArrowLeft, Cpu, HardDrive, MemoryStick, Zap, Monitor, CircuitBoard, Gamepad2, Snowflake, Package } from 'lucide-react'
import ComponentCard from './ComponentCard'

interface BuildRecommendationsProps {
  buildData: any
  onBack: () => void
}

export default function BuildRecommendations({ buildData, onBack }: BuildRecommendationsProps) {
  const budgetBuild = {
    title: "Budget Video Editing Build",
    price: "$2000",
    description: "A cost-effective setup for 1080p video editing tasks.",
    components: [
      {
        type: "Cpu",
        icon: Cpu,
        name: "Intel Core i7-13700K",
        description: "A 16-core processor offering strong performance for video editing.",
        price: "$389",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Gpu",
        icon: Monitor,
        name: "NVIDIA GeForce RTX 4060 Ti 8GB",
        description: "Provides hardware acceleration for video editing applications.",
        price: "$399",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Motherboard",
        icon: CircuitBoard,
        name: "ASUS TUF Gaming Z690-Plus WiFi DDR4",
        description: "A reliable motherboard with Wi-Fi support and expansion options.",
        price: "$179",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Ram",
        icon: MemoryStick,
        name: "Corsair Vengeance 32GB (2x16GB) DDR5-6000",
        description: "High-speed memory suitable for multitasking and video editing.",
        price: "$179",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Ssd",
        icon: HardDrive,
        name: "Samsung 980 Pro 2TB NVMe Gen4",
        description: "Fast storage for operating system and project files.",
        price: "$199",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Psu",
        icon: Zap,
        name: "Corsair RM850e 850W 80+ Gold",
        description: "Efficient power supply with modular cables for clean builds.",
        price: "$129",
        amazonLink: "#",
        neweggLink: "#"
      }
    ]
  }

  const balancedBuild = {
    title: "Balanced Video Editing Build",
    price: "$2250",
    description: "A mid-range setup for 4K video editing with enhanced performance.",
    components: [
      {
        type: "Case",
        icon: Monitor,
        name: "Lian Li LANCOOL 216",
        description: "A well-ventilated case with a sleek design.",
        price: "$89",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Cooler",
        icon: Cpu,
        name: "ARCTIC Liquid Freezer III 240 A-RGB",
        description: "An efficient liquid cooler to maintain optimal CPU temperatures.",
        price: "$119",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Gpu",
        icon: Monitor,
        name: "Intel Core Ultra 7 265K",
        description: "A 20-core processor offering excellent performance for creative tasks.",
        price: "$379",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Gpu",
        icon: Monitor,
        name: "Gigabyte Windforce GeForce RTX 5070 12GB",
        description: "A powerful GPU suitable for all video editing and rendering.",
        price: "$549",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Motherboard",
        icon: Motherboard,
        name: "MSI PRO Z890-P WiFi",
        description: "A professional board with modern connectivity and expansion options.",
        price: "$199",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Ram",
        icon: MemoryStick,
        name: "Teamgroup T-Create Expert 64GB (2x32GB) DDR5-6400",
        description: "High-capacity memory for handling large video files.",
        price: "$279",
        amazonLink: "#",
        neweggLink: "#"
      }
    ]
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Builder
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">Your PC Build Recommendations</h1>
        <p className="text-gray-400">AI-curated builds based on your requirements</p>
      </div>

      <div className="space-y-8">
        {/* Budget Build */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{budgetBuild.title}</h2>
            <div className="text-3xl font-bold text-blue-400 mb-2">{budgetBuild.price}</div>
            <p className="text-gray-400">{budgetBuild.description}</p>
          </div>

          <div className="grid gap-4">
            {budgetBuild.components.map((component, index) => (
              <ComponentCard key={index} {...component} />
            ))}
          </div>
        </div>

        {/* Balanced Build */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{balancedBuild.title}</h2>
            <div className="text-3xl font-bold text-blue-400 mb-2">{balancedBuild.price}</div>
            <p className="text-gray-400">{balancedBuild.description}</p>
          </div>

          <div className="grid gap-4">
            {balancedBuild.components.map((component, index) => (
              <ComponentCard key={index} {...component} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
