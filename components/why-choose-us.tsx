"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Truck, Shield, Headphones, Award } from "lucide-react"

const features = [
  {
    id: "delivery",
    title: "Fast Delivery",
    icon: Truck,
    description: "Get your orders delivered within 24-48 hours with our express shipping network.",
    details:
      "We partner with leading logistics companies to ensure your products reach you quickly and safely. Track your order in real-time and get updates every step of the way.",
  },
  {
    id: "security",
    title: "Secure Payment",
    icon: Shield,
    description: "Your transactions are protected with bank-level security and encryption.",
    details:
      "We use industry-standard SSL encryption and partner with trusted payment processors. Your financial information is never stored on our servers.",
  },
  {
    id: "support",
    title: "24/7 Support",
    icon: Headphones,
    description: "Our customer service team is always ready to help you with any questions.",
    details:
      "Get instant help through live chat, email, or phone. Our support team is trained to resolve issues quickly and efficiently.",
  },
  {
    id: "quality",
    title: "Premium Quality",
    icon: Award,
    description: "Every product is carefully curated and tested for the highest quality standards.",
    details:
      "We work directly with manufacturers and conduct rigorous quality checks. If you're not satisfied, we offer hassle-free returns.",
  },
]

export function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState("delivery")

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to providing the best shopping experience with unmatched service
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature Tabs */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      activeFeature === feature.id
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "hover:border-primary/50 hover:shadow-md"
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          activeFeature === feature.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        } transition-colors duration-300`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Feature Details */}
          <div className="lg:pl-8">
            <AnimatePresence mode="wait">
              {features.map((feature) => {
                if (feature.id !== activeFeature) return null
                const Icon = feature.icon

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-4 bg-primary text-primary-foreground rounded-xl">
                          <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">{feature.details}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
