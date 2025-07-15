"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { mockProducts } from "@/lib/mock-data"
import Link from "next/link"
import type { Product, WishlistItem } from "@/lib/types"
import Image from "next/image"

// Mock wishlist data
const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    productId: 1,
    product: mockProducts[0],
    addedAt: "2024-01-15",
  },
  {
    id: 2,
    productId: 3,
    product: mockProducts[2],
    addedAt: "2024-01-14",
  },
  {
    id: 3,
    productId: 5,
    product: mockProducts[4],
    addedAt: "2024-01-12",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems)

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId))
  }

  const moveToCart = (product: Product) => {
    // Add to cart logic
    console.log("Moved to cart:", product.name)
    // Remove from wishlist after moving to cart
    setWishlistItems((items) => items.filter((item) => item.productId !== product.id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const shareWishlist = () => {
    // Share wishlist logic
    console.log("Sharing wishlist...")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title="My Wishlist" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="text-6xl mb-4">💝</div>
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love to your wishlist and shop them later</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={shareWishlist}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </motion.div>

            {/* Wishlist Items */}
            <div className="space-y-6">
              <AnimatePresence>
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="p-6">
                      <div className="flex items-start space-x-6">
                        {/* Product Image */}
                        <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br relative from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg flex items-center justify-center text-3xl hover:scale-105 transition-transform">
                            <Image fill src={item.product.images[0]} alt={item.product.name} className="object-cover"/>
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
                                  {item.product.brand}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{item.product.category}</span>
                              </div>

                              <Link href={`/products/${item.product.id}`}>
                                <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                                  {item.product.name}
                                </h3>
                              </Link>

                              {/* Rating */}
                              <div className="flex items-center space-x-1 mb-3">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <span
                                      key={i}
                                      className={`text-sm ${
                                        i < Math.floor(item.product.rating) ? "text-yellow-400" : "text-gray-300"
                                      }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">({item.product.reviewCount})</span>
                              </div>

                              {/* Price */}
                              <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl font-bold text-primary">${item.product.price}</span>
                                {item.product.originalPrice && (
                                  <span className="text-muted-foreground line-through">
                                    ${item.product.originalPrice}
                                  </span>
                                )}
                              </div>

                              {/* Stock Status */}
                              <div className="mb-4">
                                {item.product.inStock ? (
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  >
                                    In Stock
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive">Out of Stock</Badge>
                                )}
                              </div>

                              {/* Added Date */}
                              <p className="text-sm text-muted-foreground">
                                Added on {new Date(item.addedAt).toLocaleDateString()}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2 ml-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeFromWishlist(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                title="Remove from wishlist"
                              >
                                <Heart className="h-5 w-5 fill-current" />
                              </motion.button>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                              <Button
                                onClick={() => moveToCart(item.product)}
                                disabled={!item.product.inStock}
                                className="w-full bg-primary hover:bg-primary/90"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {item.product.inStock ? "Move to Cart" : "Out of Stock"}
                              </Button>
                            </motion.div>

                            <Button variant="outline" asChild className="flex-1 sm:flex-none bg-transparent">
                              <Link href={`/products/${item.product.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                <h3 className="text-xl font-semibold mb-4">Ready to shop your favorites?</h3>
                <p className="text-muted-foreground mb-6">
                  Move all available items to your cart and complete your purchase
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      wishlistItems.filter((item) => item.product.inStock).forEach((item) => moveToCart(item.product))
                    }}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Move All to Cart
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </main>
    </div>
  )
}
