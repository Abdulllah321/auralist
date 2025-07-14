"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Clock, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"

interface SearchSuggestionsProps {
  query: string
  onSuggestionClick: (suggestion: string) => void
  onClose: () => void
}

const recentSearches = ["wireless headphones", "smart watch", "desk lamp"]
const trendingSearches = ["fitness tracker", "bluetooth speaker", "ergonomic chair"]

export function SearchSuggestions({ query, onSuggestionClick, onClose }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (query.length > 0) {
      const productSuggestions = mockProducts
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
        .map((product) => product.name)
        .slice(0, 5)

      const categorySuggestions = Array.from(
        new Set(
          mockProducts
            .filter((product) => product.category.toLowerCase().includes(query.toLowerCase()))
            .map((product) => product.category),
        ),
      ).slice(0, 3)

      setSuggestions([...productSuggestions, ...categorySuggestions])
    } else {
      setSuggestions([])
    }
  }, [query])

  if (query.length === 0 && recentSearches.length === 0 && trendingSearches.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 z-50 mt-2"
      >
        <Card className="p-4 shadow-lg border">
          {query.length > 0 ? (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-3 flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search Results
              </h4>
              {suggestions.length > 0 ? (
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onSuggestionClick(suggestion)}
                      className="w-full text-left p-2 hover:bg-muted rounded-md transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No suggestions found</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Recent Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <Badge
                        key={search}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => onSuggestionClick(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {trendingSearches.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search) => (
                      <Badge
                        key={search}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                        onClick={() => onSuggestionClick(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
