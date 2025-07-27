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
        icon: Gamepad2,
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
        icon: Package,
        name: "Lian Li LANCOOL 216",
        description: "A well-ventilated case with a sleek design.",
        price: "$89",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Cooler",
        icon: Snowflake,
        name: "ARCTIC Liquid Freezer III 240 A-RGB",
        description: "An efficient liquid cooler to maintain optimal CPU temperatures.",
        price: "$119",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Cpu",
        icon: Cpu,
        name: "Intel Core Ultra 7 265K",
        description: "A 20-core processor offering excellent performance for creative tasks.",
        price: "$379",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Gpu",
        icon: Gamepad2,
        name: "Gigabyte Windforce GeForce RTX 5070 12GB",
        description: "A powerful GPU suitable for all video editing and rendering.",
        price: "$549",
        amazonLink: "#",
        neweggLink: "#"
      },
      {
        type: "Motherboard",
        icon: CircuitBoard,
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
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="group flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Builder
        </button>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your PC Build Recommendations
          </h1>
          <p className="text-slate-300 text-lg">AI-curated builds based on your requirements</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Budget Build */}
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 hover:shadow-blue-400/10 hover:border-blue-400/20 transition-all duration-300 group">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-400/25 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">{budgetBuild.title}</h2>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">{budgetBuild.price}</div>
            <p className="text-slate-300 text-lg">{budgetBuild.description}</p>
          </div>

          <div className="grid gap-4">
            {budgetBuild.components.map((component, index) => (
              <ComponentCard key={index} {...component} />
            ))}
          </div>
        </div>

        {/* Balanced Build */}
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 hover:shadow-purple-400/10 hover:border-purple-400/20 transition-all duration-300 group">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-400/25 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">{balancedBuild.title}</h2>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">{balancedBuild.price}</div>
            <p className="text-slate-300 text-lg">{balancedBuild.description}</p>
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
