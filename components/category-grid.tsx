"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    name: "Electronics",
    icon: "/assets/headphones.jpeg",
    color: "from-blue-500 to-cyan-500",
    href: "/products?category=electronics",
    count: "2.5k+ items",
  },
  {
    name: "Fashion",
    icon: "/assets/fashion.jpeg",
    color: "from-pink-500 to-rose-500",
    href: "/products?category=fashion",
    count: "1.8k+ items",
  },
  {
    name: "Home & Garden",
    icon: "/assets/Home-Garden.jpeg",
    color: "from-green-500 to-emerald-500",
    href: "/products?category=home-garden",
    count: "950+ items",
  },
  {
    name: "Sports",
    icon: "/assets/fitness.jpeg",
    color: "from-orange-500 to-red-500",
    href: "/products?category=sports",
    count: "720+ items",
  },
  {
    name: "Books",
    icon: "/assets/lifestyle.jpeg",
    color: "from-purple-500 to-indigo-500",
    href: "/products?category=books",
    count: "1.2k+ items",
  },
  {
    name: "Beauty",
    icon: "/assets/beauty.jpeg",
    color: "from-pink-500 to-purple-500",
    href: "/products?category=beauty",
    count: "680+ items",
  },
]

export function CategoryGrid() {
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={category.href}>
                <Card className="p-6 text-center cursor-pointer group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-background to-muted/30">
                  <div
                    className={`w-16 relative overflow-hidden h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Image
                      fill 
                      src={category.icon}
                      alt=""
                    />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{category.count}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              View All Categories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
