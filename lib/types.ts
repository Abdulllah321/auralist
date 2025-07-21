export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  category: string
  brand: string
  inStock: boolean
  badge?: string
  stockCount: number
  variants: {
    sizes?: string[]
    colors?: { name: string; value: string }[]
  }
  features: string[]
  specifications: { [key: string]: string }
}

export interface Review {
  id: number
  userId: number
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface Filter {
  priceRange: [number, number]
  categories: string[]
  brands: string[]
  rating: number
  inStock: boolean
  sizes: string[]
  colors: string[]
}

export interface WishlistItem {
  id: number
  productId: number
  product: Product
  addedAt: string
}
