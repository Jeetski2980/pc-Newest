import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Cpu, Palette, Box, Zap, HardDrive, Gamepad2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

interface PCBuilderProps {
  onGenerateBuild: (formData: BuildFormData) => void;
  isGenerating: boolean;
}

export function PCBuilder({ onGenerateBuild, isGenerating }: PCBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BuildFormData>({
    budget: [1500],
    colorPreference: "",
    formFactor: "",
    useCase: "",
    coolingType: "",
    storageType: "",
    storageCapacity: [1],
    rgbPreference: false,
    extraPreferences: ""
  });

  const steps = [
    {
      title: "Budget",
      icon: Zap,
      description: "How much do you want to spend?"
    },
    {
      title: "Style",
      icon: Palette,
      description: "Choose your aesthetic preferences"
    },
    {
      title: "Performance",
      icon: Cpu,
      description: "What will you use this PC for?"
    },
    {
      title: "Storage",
      icon: HardDrive,
      description: "Configure your storage needs"
    },
    {
      title: "Final Details",
      icon: Box,
      description: "Any special requirements?"
    }
  ];

  const colorOptions = [
    { value: "black", label: "Stealth Black", color: "bg-gray-900" },
    { value: "white", label: "Clean White", color: "bg-white border-2" },
    { value: "rgb", label: "RGB Rainbow", color: "bg-gradient-to-r from-red-500 via-blue-500 to-purple-500" },
    { value: "blue", label: "Ocean Blue", color: "bg-blue-500" },
    { value: "red", label: "Racing Red", color: "bg-red-500" }
  ];

  const useCases = [
    { value: "gaming", label: "Gaming Beast", icon: "🎮", desc: "High FPS, latest titles" },
    { value: "streaming", label: "Content Creation", icon: "📹", desc: "Streaming & editing" },
    { value: "productivity", label: "Work Station", icon: "💼", desc: "Office & productivity" },
    { value: "ai-ml", label: "AI/ML Powerhouse", icon: "🤖", desc: "Machine learning tasks" },
    { value: "general", label: "All-Rounder", icon: "⚡", desc: "Balanced performance" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateBuild(formData);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Zap className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-bold mb-2">Set Your Budget</h3>
              <p className="text-gray-600">Tell us your budget range and we'll optimize accordingly</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  ${formData.budget[0].toLocaleString()}
                </div>
                <Badge variant="secondary">Recommended Range</Badge>
              </div>
              
              <Slider
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                min={500}
                max={5000}
                step={100}
                className="w-full"
              />
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>$500 - Budget</span>
                <span>$1500 - Sweet Spot</span>
                <span>$3000+ - High-End</span>
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Palette className="w-16 h-16 mx-auto mb-4 text-purple-500" />
              <h3 className="text-2xl font-bold mb-2">Choose Your Style</h3>
              <p className="text-gray-600">Pick colors and form factor that match your setup</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg mb-4 block">Color Theme</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {colorOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, colorPreference: option.value })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.colorPreference === option.value
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${option.color}`}></div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg mb-4 block">Form Factor</Label>
                <Select value={formData.formFactor} onValueChange={(value) => setFormData({ ...formData, formFactor: value })}>
                  <SelectTrigger className="neu-card h-12">
                    <SelectValue placeholder="Choose your case size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mini-itx">Mini ITX - Compact & Portable</SelectItem>
                    <SelectItem value="micro-atx">Micro ATX - Small & Efficient</SelectItem>
                    <SelectItem value="mid-tower">Mid Tower - Perfect Balance</SelectItem>
                    <SelectItem value="full-tower">Full Tower - Maximum Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="rgb"
                  checked={formData.rgbPreference}
                  onCheckedChange={(checked) => setFormData({ ...formData, rgbPreference: checked as boolean })}
                />
                <Label htmlFor="rgb" className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>I want RGB lighting effects</span>
                </Label>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold mb-2">Primary Use Case</h3>
              <p className="text-gray-600">What's the main purpose of this build?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <motion.button
                  key={useCase.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, useCase: useCase.value })}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover-lift ${
                    formData.useCase === useCase.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-blue-300 neu-card'
                  }`}
                >
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <div className="font-bold text-lg mb-1">{useCase.label}</div>
                  <div className="text-sm text-gray-600">{useCase.desc}</div>
                </motion.button>
              ))}
            </div>

            <div>
              <Label className="text-lg mb-4 block">Cooling Preference</Label>
              <Select value={formData.coolingType} onValueChange={(value) => setFormData({ ...formData, coolingType: value })}>
                <SelectTrigger className="neu-card h-12">
                  <SelectValue placeholder="Choose cooling solution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="air">Air Cooling - Quiet & Reliable</SelectItem>
                  <SelectItem value="liquid">Liquid Cooling - Maximum Performance</SelectItem>
                  <SelectItem value="hybrid">Hybrid - Best of Both Worlds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <HardDrive className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <h3 className="text-2xl font-bold mb-2">Storage Configuration</h3>
              <p className="text-gray-600">Configure your storage for optimal performance</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg mb-4 block">Storage Type</Label>
                <Select value={formData.storageType} onValueChange={(value) => setFormData({ ...formData, storageType: value })}>
                  <SelectTrigger className="neu-card h-12">
                    <SelectValue placeholder="Choose storage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssd-only">SSD Only - Maximum Speed</SelectItem>
                    <SelectItem value="ssd-hdd">SSD + HDD - Speed + Capacity</SelectItem>
                    <SelectItem value="nvme-only">NVMe Only - Ultra Performance</SelectItem>
                    <SelectItem value="hybrid">Hybrid Solution - Balanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg mb-4 block">
                  Storage Capacity: {formData.storageCapacity[0]}TB
                </Label>
                <Slider
                  value={formData.storageCapacity}
                  onValueChange={(value) => setFormData({ ...formData, storageCapacity: value })}
                  min={0.5}
                  max={8}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>500GB</span>
                  <span>2TB</span>
                  <span>8TB+</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Box className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
              <h3 className="text-2xl font-bold mb-2">Final Touches</h3>
              <p className="text-gray-600">Any special requirements or preferences?</p>
            </div>

            <div>
              <Label className="text-lg mb-4 block">Additional Preferences</Label>
              <Textarea
                value={formData.extraPreferences}
                onChange={(e) => setFormData({ ...formData, extraPreferences: e.target.value })}
                placeholder="I want a quiet build with minimal RGB, prefer ASUS motherboards, need WiFi 6E..."
                className="neu-card min-h-24 resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                Tell our AI about specific brands, features, or requirements you have in mind.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <h4 className="font-bold mb-3">Your Build Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>Budget: <span className="font-medium">${formData.budget[0].toLocaleString()}</span></div>
                <div>Form Factor: <span className="font-medium capitalize">{formData.formFactor?.replace('-', ' ')}</span></div>
                <div>Use Case: <span className="font-medium capitalize">{formData.useCase?.replace('-', ' ')}</span></div>
                <div>Storage: <span className="font-medium">{formData.storageCapacity[0]}TB {formData.storageType?.replace('-', ' ')}</span></div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="glass-card hover-lift">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  animate={{ scale: index === currentStep ? 1.2 : 1 }}
                />
              ))}
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-3xl font-bold gradient-text">
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription className="text-lg">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit}>
            <div className="min-h-[400px] mb-8">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="neu-button"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse-glow"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Cpu className="mr-2 h-5 w-5" />
                      🔥 Generate My AI Build
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}