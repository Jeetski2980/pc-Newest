import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingDown, TrendingUp, DollarSign, Eye, Bell, Search, Filter, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PriceData {
  date: string;
  price: number;
}

interface TrackedComponent {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  lowestPrice: number;
  highestPrice: number;
  priceChange: number;
  priceHistory: PriceData[];
  image: string;
  retailers: string[];
  inStock: boolean;
}

const mockComponents: TrackedComponent[] = [
  {
    id: "1",
    name: "NVIDIA RTX 4090 Founders Edition",
    category: "Graphics Card",
    currentPrice: 1599,
    lowestPrice: 1499,
    highestPrice: 1899,
    priceChange: -5.2,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
    retailers: ["NVIDIA", "Best Buy", "Amazon"],
    inStock: true,
    priceHistory: [
      { date: "Jan 1", price: 1699 },
      { date: "Jan 7", price: 1649 },
      { date: "Jan 14", price: 1599 },
      { date: "Jan 21", price: 1579 },
      { date: "Jan 28", price: 1599 },
    ]
  },
  {
    id: "2",
    name: "AMD Ryzen 9 7950X",
    category: "Processor",
    currentPrice: 649,
    lowestPrice: 599,
    highestPrice: 799,
    priceChange: 2.1,
    image: "https://images.unsplash.com/photo-1555617778-02518db8b2c5?w=200&h=200&fit=crop",
    retailers: ["AMD", "Newegg", "Amazon"],
    inStock: true,
    priceHistory: [
      { date: "Jan 1", price: 699 },
      { date: "Jan 7", price: 679 },
      { date: "Jan 14", price: 629 },
      { date: "Jan 21", price: 635 },
      { date: "Jan 28", price: 649 },
    ]
  },
  {
    id: "3",
    name: "Corsair Vengeance DDR5-6000 32GB",
    category: "Memory",
    currentPrice: 289,
    lowestPrice: 249,
    highestPrice: 349,
    priceChange: -8.1,
    image: "https://images.unsplash.com/photo-1541029071515-84cc80847499?w=200&h=200&fit=crop",
    retailers: ["Corsair", "Amazon", "Newegg"],
    inStock: false,
    priceHistory: [
      { date: "Jan 1", price: 319 },
      { date: "Jan 7", price: 309 },
      { date: "Jan 14", price: 295 },
      { date: "Jan 21", price: 285 },
      { date: "Jan 28", price: 289 },
    ]
  }
];

const buildPriceHistory = [
  { date: "Dec 1", gaming: 2299, productivity: 1899, budget: 1199 },
  { date: "Dec 8", gaming: 2249, productivity: 1849, budget: 1179 },
  { date: "Dec 15", gaming: 2199, productivity: 1799, budget: 1159 },
  { date: "Dec 22", gaming: 2149, productivity: 1779, budget: 1149 },
  { date: "Dec 29", gaming: 2099, productivity: 1759, budget: 1139 },
  { date: "Jan 5", gaming: 2079, productivity: 1749, budget: 1129 },
  { date: "Jan 12", gaming: 2059, productivity: 1739, budget: 1119 },
  { date: "Jan 19", gaming: 2039, productivity: 1729, budget: 1109 },
  { date: "Jan 26", gaming: 2019, productivity: 1719, budget: 1099 },
];

export function PriceTrackerPage() {
  const [activeTab, setActiveTab] = useState("components");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<TrackedComponent | null>(null);

  const filteredComponents = mockComponents.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || component.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "graphics card", "processor", "memory", "storage", "motherboard"];

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
            <DollarSign className="w-8 h-8 text-green-500" />
            <h1 className="text-4xl font-bold gradient-text">Price Tracker</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track PC component and build prices over time to find the best deals
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass-card h-auto p-2">
              <TabsTrigger value="components" className="flex items-center space-x-2 p-4">
                <Search className="w-4 h-4" />
                <span>Component Prices</span>
              </TabsTrigger>
              <TabsTrigger value="builds" className="flex items-center space-x-2 p-4">
                <Calendar className="w-4 h-4" />
                <span>Build Price History</span>
              </TabsTrigger>
            </TabsList>

            {/* Component Tracking */}
            <TabsContent value="components">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Filters and Component List */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Search and Filters */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Filter className="w-5 h-5" />
                        <span>Search & Filter</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search components..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Component List */}
                  <div className="space-y-4">
                    {filteredComponents.map((component) => (
                      <motion.div
                        key={component.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedComponent(component)}
                      >
                        <Card className={`glass-card hover-lift transition-all ${
                          selectedComponent?.id === component.id ? 'ring-2 ring-blue-500' : ''
                        }`}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <ImageWithFallback
                                  src={component.image}
                                  alt={component.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Badge variant="outline">{component.category}</Badge>
                                    {!component.inStock && (
                                      <Badge variant="destructive">Out of Stock</Badge>
                                    )}
                                  </div>
                                  <h3 className="font-bold text-lg">{component.name}</h3>
                                  <div className="text-sm text-gray-600">
                                    Available at: {component.retailers.join(", ")}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">${component.currentPrice}</div>
                                <div className={`flex items-center space-x-1 text-sm ${
                                  component.priceChange > 0 ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {component.priceChange > 0 ? (
                                    <TrendingUp className="w-4 h-4" />
                                  ) : (
                                    <TrendingDown className="w-4 h-4" />
                                  )}
                                  <span>{Math.abs(component.priceChange)}%</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Low: ${component.lowestPrice} | High: ${component.highestPrice}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Price Chart Sidebar */}
                <div className="space-y-6">
                  {selectedComponent ? (
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-lg">Price History</CardTitle>
                        <CardDescription>{selectedComponent.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 mb-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={selectedComponent.priceHistory}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#3B82F6" 
                                strokeWidth={2}
                                dot={{ fill: "#3B82F6" }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="space-y-3">
                          <Button className="w-full" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Track This Component
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Bell className="w-4 h-4 mr-2" />
                            Set Price Alert
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="glass-card">
                      <CardContent className="p-6 text-center">
                        <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Select a Component</h3>
                        <p className="text-sm text-gray-600">
                          Click on any component to view its detailed price history
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Quick Stats */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Market Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>GPU Prices</span>
                          <span className="text-green-600">↓ 3.2%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU Prices</span>
                          <span className="text-red-600">↑ 1.5%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>RAM Prices</span>
                          <span className="text-green-600">↓ 5.1%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Build Price History */}
            <TabsContent value="builds">
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Complete Build Price Trends</span>
                  </CardTitle>
                  <CardDescription>
                    Track how our recommended build categories have changed in price over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={buildPriceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="gaming"
                          stackId="1"
                          stroke="#EF4444"
                          fill="#EF4444"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="productivity"
                          stackId="2"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="budget"
                          stackId="3"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-semibold">Gaming Build</span>
                      </div>
                      <div className="text-2xl font-bold">$2,019</div>
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        -12.2% from peak
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold">Productivity Build</span>
                      </div>
                      <div className="text-2xl font-bold">$1,719</div>
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        -9.5% from peak
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-semibold">Budget Build</span>
                      </div>
                      <div className="text-2xl font-bold">$1,099</div>
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        -8.3% from peak
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}