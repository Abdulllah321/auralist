"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Search, LayoutGrid, List } from "lucide-react"
import clsx from "clsx"

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: "📱",
    color: "from-blue-500 to-cyan-500",
    count: "2,547 items",
    description: "Latest gadgets and tech accessories",
    subcategories: ["Smartphones", "Laptops", "Headphones", "Cameras"],
  },
  {
    id: 2,
    name: "Fashion",
    icon: "👗",
    color: "from-pink-500 to-rose-500",
    count: "1,823 items",
    description: "Trendy clothing and accessories",
    subcategories: ["Men's Wear", "Women's Wear", "Shoes", "Accessories"],
  },
  {
    id: 3,
    name: "Home & Garden",
    icon: "🏡",
    color: "from-green-500 to-emerald-500",
    count: "956 items",
    description: "Everything for your home and garden",
    subcategories: ["Furniture", "Decor", "Kitchen", "Garden Tools"],
  },
  {
    id: 4,
    name: "Sports & Fitness",
    icon: "⚽",
    color: "from-orange-500 to-red-500",
    count: "724 items",
    description: "Sports equipment and fitness gear",
    subcategories: ["Gym Equipment", "Outdoor Sports", "Fitness Wear", "Supplements"],
  },
  {
    id: 5,
    name: "Books & Media",
    icon: "📚",
    color: "from-purple-500 to-indigo-500",
    count: "1,234 items",
    description: "Books, movies, and digital content",
    subcategories: ["Fiction", "Non-Fiction", "Movies", "Music"],
  },
  {
    id: 6,
    name: "Beauty & Health",
    icon: "💄",
    color: "from-pink-500 to-purple-500",
    count: "687 items",
    description: "Beauty products and health essentials",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Health Supplements"],
  },
  {
    id: 7,
    name: "Automotive",
    icon: "🚗",
    color: "from-gray-500 to-slate-600",
    count: "445 items",
    description: "Car accessories and automotive parts",
    subcategories: ["Car Parts", "Accessories", "Tools", "Maintenance"],
  },
  {
    id: 8,
    name: "Toys & Games",
    icon: "🎮",
    color: "from-yellow-500 to-orange-500",
    count: "892 items",
    description: "Fun toys and games for all ages",
    subcategories: ["Video Games", "Board Games", "Kids Toys", "Puzzles"],
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Heading */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover thousands of products across our carefully curated categories
            </p>
          </motion.div>

          {/* Search & View Mode Toggle */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </motion.div>

          {/* Category Display */}
          <div className={clsx(
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"
          )}>
            {filteredCategories.map((category, index) => (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={clsx(
                        "rounded-xl p-6 bg-gradient-to-r text-white shadow-md",
                        category.color,
                        viewMode === "list" && "flex items-center gap-6"
                    )}
                >
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <h2 className="text-2xl font-semibold">{category.name}</h2>
                    <p className="text-sm text-white/90">{category.description}</p>
                    <p className="text-sm mt-1">{category.count}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {category.subcategories.map((sub, i) => (
                          <span
                              key={i}
                              className="bg-white/20 text-xs px-2 py-1 rounded-full"
                          >
                      {sub}
                    </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </main>
      </div>
  )
}
