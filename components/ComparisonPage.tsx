import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart3, Cpu, HardDrive, Zap, DollarSign, Star, TrendingUp, Award } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Component {
  type: string;
  name: string;
  image: string;
  specs: string[];
  price: number;
  rating: number;
}

interface Build {
  id: string;
  name: string;
  components: Component[];
  totalPrice: number;
  performanceRating: number;
  description: string;
  benchmarks: {
    gaming: number;
    productivity: number;
    rendering: number;
    powerEfficiency: number;
  };
  pros: string[];
  cons: string[];
}

const mockBuilds: Build[] = [
  {
    id: "1",
    name: "Gaming Champion",
    description: "Ultimate gaming performance build",
    totalPrice: 2499,
    performanceRating: 9.5,
    benchmarks: {
      gaming: 95,
      productivity: 85,
      rendering: 88,
      powerEfficiency: 78
    },
    pros: ["Excellent 4K gaming", "Ray tracing ready", "Future-proof"],
    cons: ["Higher power consumption", "Premium price"],
    components: [
      {
        type: "CPU",
        name: "AMD Ryzen 9 7900X",
        image: "https://images.unsplash.com/photo-1555617778-02518db8b2c5?w=200&h=200&fit=crop",
        specs: ["12 Cores, 24 Threads", "Base Clock: 4.7 GHz", "65W TDP"],
        price: 549,
        rating: 4.8
      },
      {
        type: "GPU",
        name: "RTX 4080 Super",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
        specs: ["16GB GDDR6X", "2610 MHz Boost", "Ray Tracing Gen 3"],
        price: 999,
        rating: 4.9
      }
    ]
  },
  {
    id: "2",
    name: "Content Creator Pro",
    description: "Optimized for streaming and content creation",
    totalPrice: 2199,
    performanceRating: 9.2,
    benchmarks: {
      gaming: 88,
      productivity: 96,
      rendering: 94,
      powerEfficiency: 85
    },
    pros: ["Excellent for streaming", "Fast rendering", "Great multitasking"],
    cons: ["Slightly lower gaming performance"],
    components: [
      {
        type: "CPU",
        name: "AMD Ryzen 9 7950X",
        image: "https://images.unsplash.com/photo-1555617778-02518db8b2c5?w=200&h=200&fit=crop",
        specs: ["16 Cores, 32 Threads", "Base Clock: 4.5 GHz", "170W TDP"],
        price: 699,
        rating: 4.7
      },
      {
        type: "GPU",
        name: "RTX 4070 Super",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
        specs: ["12GB GDDR6X", "2475 MHz Boost", "AV1 Encoding"],
        price: 599,
        rating: 4.6
      }
    ]
  },
  {
    id: "3",
    name: "Budget Beast",
    description: "Maximum performance per dollar",
    totalPrice: 1299,
    performanceRating: 8.5,
    benchmarks: {
      gaming: 82,
      productivity: 78,
      rendering: 75,
      powerEfficiency: 90
    },
    pros: ["Great value", "Low power consumption", "Solid 1440p gaming"],
    cons: ["Limited 4K performance", "No ray tracing"],
    components: [
      {
        type: "CPU",
        name: "AMD Ryzen 7 7700X",
        image: "https://images.unsplash.com/photo-1555617778-02518db8b2c5?w=200&h=200&fit=crop",
        specs: ["8 Cores, 16 Threads", "Base Clock: 4.5 GHz", "105W TDP"],
        price: 399,
        rating: 4.5
      },
      {
        type: "GPU",
        name: "RTX 4060 Ti",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
        specs: ["16GB GDDR6", "2540 MHz Boost", "DLSS 3.0"],
        price: 499,
        rating: 4.4
      }
    ]
  }
];

export function ComparisonPage() {
  const [selectedBuilds, setSelectedBuilds] = useState<string[]>(["1", "2"]);
  const [comparisonMode, setComparisonMode] = useState<"overview" | "detailed">("overview");

  const buildsToCompare = mockBuilds.filter(build => selectedBuilds.includes(build.id));

  const getBestScore = (metric: keyof Build["benchmarks"]) => {
    return Math.max(...buildsToCompare.map(build => build.benchmarks[metric]));
  };

  const getWorstScore = (metric: keyof Build["benchmarks"]) => {
    return Math.min(...buildsToCompare.map(build => build.benchmarks[metric]));
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold gradient-text">Compare Builds</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Side-by-side comparison of PC builds to help you make the perfect choice
          </p>
        </motion.div>

        {/* Build Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Select Builds to Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBuilds.map((build) => (
                  <div
                    key={build.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
                      selectedBuilds.includes(build.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => {
                      if (selectedBuilds.includes(build.id)) {
                        if (selectedBuilds.length > 2) {
                          setSelectedBuilds(selectedBuilds.filter(id => id !== build.id));
                        }
                      } else if (selectedBuilds.length < 3) {
                        setSelectedBuilds([...selectedBuilds, build.id]);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={selectedBuilds.includes(build.id) ? "default" : "outline"}>
                        {selectedBuilds.includes(build.id) ? "Selected" : "Select"}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{build.performanceRating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{build.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{build.description}</p>
                    <div className="text-xl font-bold gradient-text">
                      ${build.totalPrice.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Content */}
        {buildsToCompare.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs value={comparisonMode} onValueChange={(value) => setComparisonMode(value as "overview" | "detailed")}>
              <TabsList className="grid w-full grid-cols-2 mb-6 glass-card">
                <TabsTrigger value="overview">Performance Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {/* Performance Radar Chart Comparison */}
                <Card className="glass-card hover-lift mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Performance Benchmarks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {Object.entries(buildsToCompare[0].benchmarks).map(([metric, _]) => (
                        <div key={metric} className="space-y-3">
                          <h4 className="font-semibold capitalize flex items-center space-x-2">
                            {metric === 'gaming' && <Zap className="w-4 h-4 text-purple-500" />}
                            {metric === 'productivity' && <Cpu className="w-4 h-4 text-blue-500" />}
                            {metric === 'rendering' && <HardDrive className="w-4 h-4 text-green-500" />}
                            {metric === 'powerEfficiency' && <Award className="w-4 h-4 text-orange-500" />}
                            <span>{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </h4>
                          <div className="space-y-2">
                            {buildsToCompare.map((build, index) => (
                              <div key={build.id} className="flex items-center space-x-4">
                                <div className="w-32 text-sm font-medium">{build.name}</div>
                                <div className="flex-1">
                                  <Progress
                                    value={build.benchmarks[metric as keyof typeof build.benchmarks]}
                                    className="h-3"
                                  />
                                </div>
                                <div className={`text-sm font-bold w-12 text-right ${
                                  build.benchmarks[metric as keyof typeof build.benchmarks] === getBestScore(metric as keyof Build["benchmarks"])
                                    ? 'text-green-600' : 
                                  build.benchmarks[metric as keyof typeof build.benchmarks] === getWorstScore(metric as keyof Build["benchmarks"])
                                    ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                  {build.benchmarks[metric as keyof typeof build.benchmarks]}%
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Price and Performance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {buildsToCompare.map((build, index) => (
                    <motion.div
                      key={build.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card hover-lift h-full">
                        <CardHeader className="text-center">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            {index === 0 && <Award className="w-5 h-5 text-yellow-500" />}
                            <CardTitle className="text-xl">{build.name}</CardTitle>
                          </div>
                          <div className="text-3xl font-bold gradient-text">
                            ${build.totalPrice.toLocaleString()}
                          </div>
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold">{build.performanceRating}/10</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                              <ul className="space-y-1">
                                {build.pros.map((pro, proIndex) => (
                                  <li key={proIndex} className="text-sm flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    <span>{pro}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-red-600 mb-2">Considerations</h4>
                              <ul className="space-y-1">
                                {build.cons.map((con, conIndex) => (
                                  <li key={conIndex} className="text-sm flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    <span>{con}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            Choose This Build
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="detailed">
                {/* Detailed Component Comparison */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Component-by-Component Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Component</th>
                            {buildsToCompare.map((build) => (
                              <th key={build.id} className="text-center py-3 px-4 min-w-64">
                                <div className="font-bold">{build.name}</div>
                                <div className="text-sm text-gray-500">${build.totalPrice.toLocaleString()}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {['CPU', 'GPU'].map((componentType) => (
                            <tr key={componentType} className="border-b">
                              <td className="py-4 px-4 font-semibold">{componentType}</td>
                              {buildsToCompare.map((build) => {
                                const component = build.components.find(c => c.type === componentType);
                                return (
                                  <td key={build.id} className="py-4 px-4 text-center">
                                    {component && (
                                      <div className="space-y-2">
                                        <ImageWithFallback
                                          src={component.image}
                                          alt={component.name}
                                          className="w-16 h-16 mx-auto object-cover rounded-lg"
                                        />
                                        <div className="font-semibold text-sm">{component.name}</div>
                                        <div className="text-xs text-gray-600 space-y-1">
                                          {component.specs.map((spec, specIndex) => (
                                            <div key={specIndex}>{spec}</div>
                                          ))}
                                        </div>
                                        <div className="font-bold text-green-600">${component.price}</div>
                                        <div className="flex items-center justify-center space-x-1">
                                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                          <span className="text-xs">{component.rating}</span>
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </div>
    </div>
  );
}