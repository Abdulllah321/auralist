"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Product } from "@/lib/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
            {!product.inStock && (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                isInWishlist
                  ? "bg-red-500 text-white "
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300"
              } ${
                isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 transition-all ${
                isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </motion.button>
          </div>

          {/* Product Image Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl ">
            <Image
              fill
              src={product.images[0]}
              alt={product.name}
              className="object-contain"
            />{" "}
          </div>
        </div>

        <div className="p-6">
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.brand}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.inStock && (
            <div className="text-sm text-green-600 mb-4">
              {product.stockCount <= 5
                ? `Only ${product.stockCount} left!`
                : "In Stock"}
            </div>
          )}

          {/* Add to Cart Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
