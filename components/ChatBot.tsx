import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Zap,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const quickSuggestions = [
  "What's the best GPU for 1440p gaming?",
  "How much RAM do I need for streaming?",
  "Intel vs AMD for productivity?",
  "Best budget gaming build under $1000?",
  "Do I need liquid cooling?",
];

const botResponses = {
  greeting: [
    "Hi! I'm your AI PC building assistant. How can I help you create the perfect build today?",
    "Hello! Ready to build an amazing PC? I'm here to guide you through every step!",
    "Welcome! I'm your AI expert ready to help you build the PC of your dreams. What's your main use case?",
  ],
  gaming: [
    "For gaming, I'd recommend focusing on a powerful GPU and balanced CPU. What's your target resolution and frame rate?",
    "Gaming builds benefit from high-performance graphics cards. Are you looking for 1080p, 1440p, or 4K gaming?",
    "Great choice! Gaming PCs need strong GPUs. What's your budget range and favorite games?",
  ],
  budget: [
    "Budget is key to getting the right balance. For $800-1200 you can get excellent 1440p gaming. For $1500+ you're looking at 4K territory!",
    "I can work with any budget! Under $1000 gets you solid 1080p gaming, $1000-2000 is the sweet spot for most users.",
    "Let's optimize your budget! What's your target price range and primary use case?",
  ],
  technical: [
    "Great question! DDR5 is becoming the standard, and 16GB is typically enough for gaming, but 32GB future-proofs your build.",
    "For CPUs, both Intel and AMD offer excellent options. AMD Ryzen is great for productivity, Intel excels in gaming performance.",
    "Storage-wise, go for NVMe SSD as your primary drive. 1TB is the sweet spot for most users.",
  ],
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: botResponses.greeting[
        Math.floor(Math.random() * botResponses.greeting.length)
      ],
      isBot: true,
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (
    userMessage: string,
  ): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let responseCategory = "greeting";

    if (
      lowerMessage.includes("gaming") ||
      lowerMessage.includes("game") ||
      lowerMessage.includes("fps") ||
      lowerMessage.includes("gpu")
    ) {
      responseCategory = "gaming";
    } else if (
      lowerMessage.includes("budget") ||
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("$")
    ) {
      responseCategory = "budget";
    } else if (
      lowerMessage.includes("ram") ||
      lowerMessage.includes("cpu") ||
      lowerMessage.includes("storage") ||
      lowerMessage.includes("motherboard")
    ) {
      responseCategory = "technical";
    }

    const responses =
      botResponses[
        responseCategory as keyof typeof botResponses
      ] || botResponses.greeting;
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    return {
      id: Date.now(),
      text: randomResponse,
      isBot: true,
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(
        Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 3) + 3,
      ),
    };
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse = generateBotResponse(text);
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 2000,
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl transition-all duration-300 z-50 animate-pulse-glow"
            >
              <MessageCircle className="h-6 w-6 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <HelpCircle className="h-3 w-3 text-white" />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="fixed bottom-6 right-6 w-96 h-[32rem] z-50"
          >
            <Card className="glass-card shadow-2xl flex flex-col h-full border-2 border-blue-200/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">
                      AI Assistant
                    </CardTitle>
                    <p className="text-xs opacity-90">
                      Always here to help!
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex items-start space-x-2 ${
                          message.isBot ? "" : "justify-end"
                        }`}
                      >
                        {message.isBot && (
                          <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}

                        <div
                          className={`max-w-[80%] ${message.isBot ? "" : "order-first"}`}
                        >
                          <div
                            className={`p-3 rounded-lg text-sm ${
                              message.isBot
                                ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto"
                            }`}
                          >
                            {message.text}
                          </div>

                          {message.suggestions && (
                            <div className="mt-2 space-y-1">
                              {message.suggestions.map(
                                (suggestion, index) => (
                                  <motion.button
                                    key={index}
                                    initial={{
                                      opacity: 0,
                                      scale: 0.8,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      scale: 1,
                                    }}
                                    transition={{
                                      delay: index * 0.1,
                                    }}
                                    onClick={() =>
                                      handleSuggestionClick(
                                        suggestion,
                                      )
                                    }
                                    className="block w-full text-left p-2 text-xs bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
                                  >
                                    <Lightbulb className="w-3 h-3 inline mr-1 text-blue-500" />
                                    {suggestion}
                                  </motion.button>
                                ),
                              )}
                            </div>
                          )}

                          <div className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        </div>

                        {!message.isBot && (
                          <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) =>
                        setInputMessage(e.target.value)
                      }
                      placeholder="Ask me anything about PC building..."
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        handleSendMessage()
                      }
                      className="flex-1 border-2 focus:border-blue-500"
                      disabled={isTyping}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSendMessage()}
                      disabled={
                        !inputMessage.trim() || isTyping
                      }
                      className="neu-button px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Powered by AI
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}