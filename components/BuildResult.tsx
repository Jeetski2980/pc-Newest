import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ExternalLink, Star, Zap, DollarSign, Heart, Share2, Check, TrendingUp, Award, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

interface BuildResultProps {
  builds: Build[];
}

export function BuildResult({ builds }: BuildResultProps) {
  const [selectedBuild, setSelectedBuild] = useState(0);
  const [likedBuilds, setLikedBuilds] = useState<Set<string>>(new Set());
  const [showAlternatives, setShowAlternatives] = useState<{[key: string]: boolean}>({});

  if (builds.length === 0) return null;

  const toggleLike = (buildId: string) => {
    const newLikedBuilds = new Set(likedBuilds);
    if (newLikedBuilds.has(buildId)) {
      newLikedBuilds.delete(buildId);
    } else {
      newLikedBuilds.add(buildId);
    }
    setLikedBuilds(newLikedBuilds);
  };

  const getBuildIcon = (index: number) => {
    switch (index) {
      case 0: return <Award className="w-5 h-5 text-yellow-500" />;
      case 1: return <DollarSign className="w-5 h-5 text-green-500" />;
      case 2: return <Flame className="w-5 h-5 text-red-500" />;
      default: return <Star className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBuildBadge = (index: number) => {
    switch (index) {
      case 0: return { text: "AI Recommended", variant: "default" as const };
      case 1: return { text: "Best Value", variant: "secondary" as const };
      case 2: return { text: "Performance Beast", variant: "destructive" as const };
      default: return { text: "Alternative", variant: "outline" as const };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-7xl mx-auto mt-12"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold gradient-text mb-3"
        >
          Your AI-Generated PC Builds
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Our AI has analyzed your requirements and created these personalized builds
        </motion.p>
      </div>

      <Tabs value={selectedBuild.toString()} onValueChange={(value) => setSelectedBuild(parseInt(value))}>
        <TabsList className="grid w-full grid-cols-3 mb-8 glass-card p-2 h-auto">
          {builds.map((build, index) => (
            <TabsTrigger
              key={build.id}
              value={index.toString()}
              className="text-center p-4 data-[state=active]:glass-card transition-all duration-200"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                {getBuildIcon(index)}
                <Badge {...getBuildBadge(index)}>{getBuildBadge(index).text}</Badge>
              </div>
              <div>
                <div className="font-semibold text-base">{build.name}</div>
                <div className="text-sm text-gray-500">${build.totalPrice.toLocaleString()}</div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {builds.map((build, index) => (
            <TabsContent key={build.id} value={index.toString()}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {getBuildIcon(index)}
                          <CardTitle className="text-3xl">{build.name}</CardTitle>
                          <Badge {...getBuildBadge(index)}>{getBuildBadge(index).text}</Badge>
                        </div>
                        <CardDescription className="text-lg mb-4">
                          {build.description}
                        </CardDescription>
                        {build.pros && (
                          <div className="flex flex-wrap gap-2">
                            {build.pros.map((pro, proIndex) => (
                              <Badge key={proIndex} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="w-3 h-3 mr-1" />
                                {pro}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold gradient-text mb-2">
                          ${build.totalPrice.toLocaleString()}
                        </div>
                        <div className="flex items-center justify-end space-x-2 mb-3">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="font-bold text-xl">{build.performanceRating}/10</span>
                          <span className="text-gray-500">Performance</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleLike(build.id)}
                            className={`neu-button ${likedBuilds.has(build.id) ? 'text-red-500' : ''}`}
                          >
                            <Heart className={`h-4 w-4 ${likedBuilds.has(build.id) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button variant="outline" size="sm" className="neu-button">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Performance Benchmarks */}
                    {build.benchmarks && (
                      <div className="mt-6 p-4 glass-card rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Performance Benchmarks
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Gaming</span>
                              <span>{build.benchmarks.gaming}%</span>
                            </div>
                            <Progress value={build.benchmarks.gaming} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Productivity</span>
                              <span>{build.benchmarks.productivity}%</span>
                            </div>
                            <Progress value={build.benchmarks.productivity} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Rendering</span>
                              <span>{build.benchmarks.rendering}%</span>
                            </div>
                            <Progress value={build.benchmarks.rendering} className="h-2" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-4">
                      {build.components.map((component, componentIndex) => (
                        <motion.div
                          key={componentIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: componentIndex * 0.1 }}
                          className="flex items-center justify-between p-6 glass-card rounded-xl hover-lift"
                        >
                          <div className="flex items-center space-x-6">
                            <div className="relative">
                              <ImageWithFallback
                                src={component.image}
                                alt={component.name}
                                className="w-20 h-20 object-cover rounded-lg shadow-md"
                              />
                              {component.popularity && (
                                <Badge className="absolute -top-2 -right-2 text-xs">
                                  {component.popularity}
                                </Badge>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {component.type}
                                </Badge>
                                {component.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs text-gray-600">{component.rating}</span>
                                  </div>
                                )}
                              </div>
                              <h4 className="font-bold text-lg mb-2">{component.name}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-gray-600">
                                {component.specs.map((spec, specIndex) => (
                                  <div key={specIndex} className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                                    {spec}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-3">
                            <div className="text-2xl font-bold text-green-600">
                              ${component.price}
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Buy Now
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAlternatives({
                                  ...showAlternatives,
                                  [`${build.id}-${componentIndex}`]: !showAlternatives[`${build.id}-${componentIndex}`]
                                })}
                                className="text-xs"
                              >
                                Show Alternatives
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 p-6 glass-card rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-6 w-6 text-green-600" />
                            <div>
                              <div className="text-sm text-gray-600">Total Price</div>
                              <div className="text-2xl font-bold">${build.totalPrice.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="h-6 w-6 text-yellow-600" />
                            <div>
                              <div className="text-sm text-gray-600">Performance Score</div>
                              <div className="text-2xl font-bold">{build.performanceRating}/10</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline" className="neu-button">
                            Compare Builds
                          </Button>
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8">
                            Save This Build
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}