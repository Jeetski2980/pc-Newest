import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Shield, FileText, HeadphonesIcon, Mail, MessageCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

export function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">About Stack PC AI</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about our service, policies, and how to get support
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="privacy" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 glass-card h-auto p-2">
              <TabsTrigger value="privacy" className="flex items-center space-x-2 p-4">
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </TabsTrigger>
              <TabsTrigger value="terms" className="flex items-center space-x-2 p-4">
                <FileText className="w-4 h-4" />
                <span>Terms of Service</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center space-x-2 p-4">
                <HeadphonesIcon className="w-4 h-4" />
                <span>Support</span>
              </TabsTrigger>
            </TabsList>

            {/* Privacy Policy */}
            <TabsContent value="privacy">
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <CardTitle className="text-2xl">Privacy Policy</CardTitle>
                  </div>
                  <CardDescription>
                    Last updated: January 2025
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Information We Collect</h3>
                    <div className="space-y-3 text-gray-600">
                      <p>
                        Stack PC AI is designed with privacy in mind. We collect minimal information to provide our AI-powered PC building service:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>PC build preferences and requirements you provide through our forms</li>
                        <li>Basic usage analytics to improve our AI recommendations</li>
                        <li>Chat interactions with our AI assistant for better support</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">How We Use Your Information</h3>
                    <div className="space-y-3 text-gray-600">
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Generate personalized PC build recommendations</li>
                        <li>Improve our AI algorithms and user experience</li>
                        <li>Provide customer support and assistance</li>
                        <li>Send important service updates (if you opt-in)</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Data Protection</h3>
                    <div className="space-y-3 text-gray-600">
                      <p>
                        We implement industry-standard security measures to protect your data. Your PC build preferences are not sold to third parties and are only used to improve our AI recommendations.
                      </p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        No Personal Identifiable Information (PII) Required
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p className="text-gray-600">
                      If you have any questions about this Privacy Policy, please contact us through our support channels.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Terms of Service */}
            <TabsContent value="terms">
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="w-6 h-6 text-purple-500" />
                    <CardTitle className="text-2xl">Terms of Service</CardTitle>
                  </div>
                  <CardDescription>
                    Last updated: January 2025
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Service Description</h3>
                    <div className="space-y-3 text-gray-600">
                      <p>
                        Stack PC AI provides AI-powered PC build recommendations based on your preferences, budget, and use case. Our service includes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Personalized PC build generation</li>
                        <li>Component comparison and analysis</li>
                        <li>Price tracking for PC components</li>
                        <li>AI-powered chat support</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Disclaimer</h3>
                    <div className="space-y-3 text-gray-600">
                      <p>
                        Stack PC AI provides recommendations for educational and informational purposes. We are not responsible for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Component compatibility issues not identified by our AI</li>
                        <li>Price fluctuations from third-party retailers</li>
                        <li>Product availability or shipping delays</li>
                        <li>Hardware performance variations</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Third-Party Links</h3>
                    <p className="text-gray-600">
                      Our service includes affiliate links to retailers like Amazon, Newegg, and others. We may earn commissions from purchases made through these links, but this does not affect our AI recommendations or your purchase price.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
                    <p className="text-gray-600">
                      Stack PC AI and its developers shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of our service or AI recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Support */}
            <TabsContent value="support">
              <Card className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <HeadphonesIcon className="w-6 h-6 text-green-500" />
                    <CardTitle className="text-2xl">Support Center</CardTitle>
                  </div>
                  <CardDescription>
                    Get help with Stack PC AI and your PC building questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Get Help</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <MessageCircle className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium">AI Chat Assistant</div>
                            <div className="text-sm text-gray-600">Get instant help from our AI</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <Mail className="w-5 h-5 text-green-500" />
                          <div>
                            <div className="font-medium">Email Support</div>
                            <div className="text-sm text-gray-600">support@stackpcai.tech</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <Clock className="w-5 h-5 text-orange-500" />
                          <div>
                            <div className="font-medium">Response Time</div>
                            <div className="text-sm text-gray-600">Usually within 24 hours</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                      
                      <div className="space-y-3">
                        <details className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <summary className="font-medium cursor-pointer">How accurate are the AI recommendations?</summary>
                          <p className="text-sm text-gray-600 mt-2">Our AI analyzes thousands of component combinations and user preferences to provide highly accurate recommendations with 95%+ compatibility rate.</p>
                        </details>

                        <details className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <summary className="font-medium cursor-pointer">Are the prices shown real-time?</summary>
                          <p className="text-sm text-gray-600 mt-2">Prices are updated regularly but may vary. Always check the retailer's website for the most current pricing before purchasing.</p>
                        </details>

                        <details className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <summary className="font-medium cursor-pointer">Can I save my build configurations?</summary>
                          <p className="text-sm text-gray-600 mt-2">Yes! You can save builds and compare different configurations. Your saved builds are stored locally in your browser.</p>
                        </details>

                        <details className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <summary className="font-medium cursor-pointer">Do you offer assembly services?</summary>
                          <p className="text-sm text-gray-600 mt-2">Stack PC AI is a recommendation service. We provide building guides and can connect you with local PC building services in your area.</p>
                        </details>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Still need help?</h4>
                    <p className="text-gray-600 mb-4">
                      Our AI assistant is available 24/7 to help with PC building questions and technical support.
                    </p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Click the chat icon in the bottom-right corner to get started
                    </Badge>
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