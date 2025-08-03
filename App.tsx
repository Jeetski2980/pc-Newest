import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { PCBuilder } from "./components/PCBuilder";
import { BuildResult } from "./components/BuildResult";
import { ComparisonPage } from "./components/ComparisonPage";
import { AboutPage } from "./components/AboutPage";
import { PriceTrackerPage } from "./components/PriceTrackerPage";
import { ChatBot } from "./components/ChatBot";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import { Cpu, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface BuildFormData {
  budget: number[];
  colorPreference: string;
  formFactor: string;
  useCase: string;
  coolingType: string;
  storageType: string;
  storageCapacity: number[];
  rgbPreference: boolean;
  extraPreferences: string;
}

interface Component {
  type: string;
  name: string;
  image: string;
  specs: string[];
  price: number;
  buyLink: string;
  rating?: number;
  popularity?: string;
}

interface Build {
  id: string;
  name: string;
  components: Component[];
  totalPrice: number;
  performanceRating: number;
  description: string;
  pros: string[];
  benchmarks?: {
    gaming: number;
    productivity: number;
    rendering: number;
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "build" | "price-tracker" | "about"
  >("home");
  const [builds, setBuilds] = useState<Build[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Enhanced AI build generation with more realistic data
  const generateBuilds = (formData: BuildFormData) => {
    setIsGenerating(true);

    // Simulate AI processing time with more realistic delay
    setTimeout(() => {
      const mockBuilds: Build[] = [
        {
          id: "1",
          name: "AI Recommended",
          description:
            "Our AI's top recommendation perfectly balanced for your needs",
          totalPrice: formData.budget[0],
          performanceRating: 9.2,
          pros: [
            "Optimized for your use case",
            "Great price-to-performance",
            "Future-proof components",
          ],
          benchmarks: {
            gaming: formData.useCase === "gaming" ? 95 : 85,
            productivity:
              formData.useCase === "productivity" ? 95 : 80,
            rendering:
              formData.useCase === "streaming" ? 92 : 78,
          },
          components: [
            {
              type: "CPU",
              name:
                formData.budget[0] > 2500
                  ? "AMD Ryzen 9 7950X"
                  : formData.budget[0] > 1500
                    ? "AMD Ryzen 9 7900X"
                    : "AMD Ryzen 7 7700X",
              image:
                "https://images.unsplash.com/photo-1555617778-02518db8b2c5?w=200&h=200&fit=crop",
              specs:
                formData.budget[0] > 2500
                  ? [
                      "16 Cores, 32 Threads",
                      "Base Clock: 4.5 GHz",
                      "170W TDP",
                    ]
                  : [
                      "8-12 Cores",
                      "Base Clock: 4.5+ GHz",
                      "105W TDP",
                    ],
              price:
                formData.budget[0] > 2500
                  ? 699
                  : formData.budget[0] > 1500
                    ? 549
                    : 399,
              buyLink: "https://amazon.com/cpu",
              rating: 4.8,
              popularity: "Best Seller",
            },
            {
              type: "GPU",
              name:
                formData.budget[0] > 3000
                  ? "RTX 4090"
                  : formData.budget[0] > 2000
                    ? "RTX 4080 Super"
                    : formData.budget[0] > 1200
                      ? "RTX 4070 Super"
                      : "RTX 4060 Ti",
              image:
                "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
              specs:
                formData.budget[0] > 2000
                  ? [
                      "16-24GB GDDR6X",
                      "Ray Tracing Gen 3",
                      "DLSS 3.5",
                    ]
                  : [
                      "12-16GB GDDR6",
                      "Ray Tracing",
                      "DLSS 3.0",
                    ],
              price:
                formData.budget[0] > 3000
                  ? 1599
                  : formData.budget[0] > 2000
                    ? 999
                    : formData.budget[0] > 1200
                      ? 599
                      : 499,
              buyLink: "https://amazon.com/gpu",
              rating: 4.9,
            },
            {
              type: "RAM",
              name:
                formData.budget[0] > 2000
                  ? "32GB DDR5-6000"
                  : "16GB DDR5-5600",
              image:
                "https://images.unsplash.com/photo-1541029071515-84cc80847499?w=200&h=200&fit=crop",
              specs: formData.rgbPreference
                ? ["RGB Lighting", "Low Latency", "XMP 3.0"]
                : ["Non-RGB", "CL36 Latency", "Reliable"],
              price: formData.budget[0] > 2000 ? 299 : 149,
              buyLink: "https://amazon.com/ram",
              rating: 4.7,
            },
            {
              type: "Storage",
              name: `${formData.storageCapacity[0]}TB ${formData.storageType?.includes("nvme") ? "NVMe" : "SSD"}`,
              image:
                "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop",
              specs: [
                "PCIe 4.0",
                "7000+ MB/s Read",
                "High Endurance",
              ],
              price: Math.round(
                formData.storageCapacity[0] *
                  (formData.storageType?.includes("nvme")
                    ? 120
                    : 80),
              ),
              buyLink: "https://amazon.com/storage",
              rating: 4.6,
            },
            {
              type: "Motherboard",
              name:
                formData.budget[0] > 2000
                  ? "X670E Premium Board"
                  : "B650 Gaming Board",
              image:
                "https://images.unsplash.com/photo-1518118444-e24f7be9b73a?w=200&h=200&fit=crop",
              specs: ["Wi-Fi 6E", "USB 4.0", "PCIe 5.0"],
              price: formData.budget[0] > 2000 ? 349 : 199,
              buyLink: "https://amazon.com/motherboard",
              rating: 4.5,
            },
          ],
        },
        {
          id: "2",
          name: "Value Champion",
          description:
            "Maximum performance per dollar spent - our AI's budget optimization",
          totalPrice: Math.round(formData.budget[0] * 0.8),
          performanceRating: 8.8,
          pros: [
            "Best bang for buck",
            "Energy efficient",
            "Solid 1440p performance",
          ],
          benchmarks: {
            gaming: 85,
            productivity: 82,
            rendering: 80,
          },
          components: [
            {
              type: "CPU",
              name:
                formData.budget[0] > 1500
                  ? "AMD Ryzen 7 7700X"
                  : "AMD Ryzen 5 7600X",
              image:
                "https://images.unsplash.com/photo-1555617778-02518db8b2c5?w=200&h=200&fit=crop",
              specs: [
                "6-8 Cores",
                "High Clock Speed",
                "Efficient",
              ],
              price: formData.budget[0] > 1500 ? 329 : 279,
              buyLink: "https://amazon.com/cpu",
              rating: 4.6,
            },
            {
              type: "GPU",
              name:
                formData.budget[0] > 1500
                  ? "RTX 4070"
                  : "RTX 4060 Ti",
              image:
                "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
              specs: [
                "12-16GB VRAM",
                "Efficient Architecture",
                "DLSS Support",
              ],
              price: formData.budget[0] > 1500 ? 549 : 449,
              buyLink: "https://amazon.com/gpu",
              rating: 4.4,
            },
          ],
        },
        {
          id: "3",
          name: "Future Beast",
          description:
            "Overkill performance build - ready for anything the future throws at it",
          totalPrice: Math.round(formData.budget[0] * 1.2),
          performanceRating: 9.8,
          pros: [
            "Extreme performance",
            "4K gaming ready",
            "Professional workloads",
            "10+ year future-proof",
          ],
          benchmarks: {
            gaming: 98,
            productivity: 95,
            rendering: 97,
          },
          components: [
            {
              type: "CPU",
              name: "AMD Ryzen 9 7950X3D",
              image:
                "https://images.unsplash.com/photo-1555617778-02518db8b2c5?w=200&h=200&fit=crop",
              specs: [
                "16 Cores, 32 Threads",
                "3D V-Cache",
                "Gaming Optimized",
              ],
              price: 799,
              buyLink: "https://amazon.com/cpu",
              rating: 4.9,
              popularity: "Editor's Choice",
            },
            {
              type: "GPU",
              name: "RTX 4090",
              image:
                "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
              specs: [
                "24GB GDDR6X",
                "16384 CUDA Cores",
                "Ray Tracing Beast",
              ],
              price: 1599,
              buyLink: "https://amazon.com/gpu",
              rating: 4.9,
            },
          ],
        },
      ];

      setBuilds(mockBuilds);
      setIsGenerating(false);
    }, 3000);
  };

  const scrollToBuildSection = () => {
    const element = document.getElementById("build-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(
      page as "home" | "build" | "price-tracker" | "about",
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "build":
        return (
          <div className="flex relative">
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                {/* PC Builder Section */}
                <section id="build-section" className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <PCBuilder
                      onGenerateBuild={generateBuilds}
                      isGenerating={isGenerating}
                    />
                  </motion.div>
                </section>

                {/* Enhanced Loading State */}
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mt-12 mb-12"
                  >
                    <div className="glass-card inline-flex items-center px-8 py-6 space-x-4">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <div className="absolute inset-0 rounded-full bg-blue-600 opacity-20 animate-ping"></div>
                      </div>
                      <div className="text-left">
                        <div className="text-blue-600 font-semibold text-lg">
                          AI is analyzing your requirements...
                        </div>
                        <div className="text-sm text-gray-500">
                          This may take a few moments for
                          optimal results
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Build Results */}
                <BuildResult builds={builds} />

                {/* Comparison Section */}
                {builds.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16"
                  >
                    <ComparisonPage />
                  </motion.div>
                )}
              </div>
            </main>
            <Sidebar />
          </div>
        );

      case "price-tracker":
        return <PriceTrackerPage />;

      case "about":
        return <AboutPage />;

      default:
        return (
          <>
            {/* Enhanced Hero Section */}
            <section className="relative pt-24 pb-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="mb-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-6"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>
                          Powered by Advanced AI Technology
                        </span>
                      </motion.div>

                      <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Build Your Dream PC with{" "}
                        <span className="gradient-text animate-float">
                          AI Power
                        </span>
                      </h1>

                      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
                        Our advanced AI analyzes your needs,
                        budget, and preferences to create the
                        perfect custom PC build recommendations
                        in seconds.
                      </p>

                      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <Button
                          onClick={() =>
                            setCurrentPage("build")
                          }
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
                        >
                          <Cpu className="mr-2 h-5 w-5" />
                          Start Building Now
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() =>
                            setCurrentPage("price-tracker")
                          }
                          className="neu-button px-8 py-4 text-lg"
                        >
                          Track Prices
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="glass-card p-8 animate-float">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <Cpu className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-bold">
                              AI-Powered Matching
                            </div>
                            <div className="text-sm text-gray-600">
                              Smart component selection
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-bold">
                              Instant Optimization
                            </div>
                            <div className="text-sm text-gray-600">
                              Budget and performance balanced
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <ChevronDown className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-bold">
                              Direct Purchase Links
                            </div>
                            <div className="text-sm text-gray-600">
                              Buy components instantly
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div
                      className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {renderCurrentPage()}

      <Footer />
      <ChatBot />
    </div>
  );
}