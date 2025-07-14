"use client"

import { useState } from "react"
import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Filter as FilterType } from "@/lib/types"

interface ProductFiltersProps {
  filters: FilterType
  onFiltersChange: (filters: FilterType) => void
  onClearFilters: () => void
}

const categories = ["Electronics", "Fashion", "Home & Garden", "Wearables", "Sports"]
const brands = ["AudioTech", "FitTech", "LightCraft", "EcoWear", "LensMaster", "ComfortPro"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "38mm", "42mm", "46mm"]
const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Gray", value: "#6B7280" },
  { name: "Navy", value: "#1E3A8A" },
]

export function ProductFilters({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    price: true,
    category: true,
    brand: false,
    rating: false,
    availability: false,
    size: false,
    color: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilters = (key: keyof FilterType, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++
    if (filters.categories.length > 0) count++
    if (filters.brands.length > 0) count++
    if (filters.rating > 0) count++
    if (filters.inStock) count++
    if (filters.sizes.length > 0) count++
    if (filters.colors.length > 0) count++
    return count
  }

  return (
    <Card className="p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        {getActiveFiltersCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
            <span className="font-medium">Price Range</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters("priceRange", value as [number, number])}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Categories */}
        <Collapsible open={openSections.category} onOpenChange={() => toggleSection("category")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
            <span className="font-medium">Categories</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.category ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilters("categories", [...filters.categories, category])
                      } else {
                        updateFilters(
                          "categories",
                          filters.categories.filter((c) => c !== category),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Brands */}
        <Collapsible open={openSections.brand} onOpenChange={() => toggleSection("brand")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
            <span className="font-medium">Brands</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.brand ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilters("brands", [...filters.brands, brand])
                      } else {
                        updateFilters(
                          "brands",
                          filters.brands.filter((b) => b !== brand),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={brand} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Rating */}
        <Collapsible open={openSections.rating} onOpenChange={() => toggleSection("rating")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
            <span className="font-medium">Rating</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.rating ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={(checked) => {
                      updateFilters("rating", checked ? rating : 0)
                    }}
                  />
                  <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                    <span className="ml-1">& up</span>
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Availability */}
        <Collapsible open={openSections.availability} onOpenChange={() => toggleSection("availability")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
            <span className="font-medium">Availability</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.availability ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilters("inStock", checked)}
              />
              <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Sizes */}
        <Collapsible open={openSections.size} onOpenChange={() => toggleSection("size")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
            <span className="font-medium">Sizes</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.size ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={filters.sizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (filters.sizes.includes(size)) {
                      updateFilters(
                        "sizes",
                        filters.sizes.filter((s) => s !== size),
                      )
                    } else {
                      updateFilters("sizes", [...filters.sizes, size])
                    }
                  }}
                  className="text-xs"
                >
                  {size}
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Colors */}
        <Collapsible open={openSections.color} onOpenChange={() => toggleSection("color")}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
            <span className="font-medium">Colors</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.color ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    if (filters.colors.includes(color.name)) {
                      updateFilters(
                        "colors",
                        filters.colors.filter((c) => c !== color.name),
                      )
                    } else {
                      updateFilters("colors", [...filters.colors, color.name])
                    }
                  }}
                  className={`w-8 h-8 rounded-full border-2 ${
                    filters.colors.includes(color.name) ? "border-primary" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  )
}
