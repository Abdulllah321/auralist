export interface User {
  id: number
  name: string
  email: string
  phone: string
  profileImage?: string
  joinedDate: string
  isSeller: boolean
  sellerStatus?: "pending" | "approved" | "rejected"
}

export interface Address {
  id: number
  type: "home" | "work" | "other"
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  date: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "returned"
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  shippingAddress: Address
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: string
  deliveredDate?: string
  cancelReason?: string
  returnReason?: string
}

export interface OrderItem {
  id: number
  productId: number
  productName: string
  productImage: string
  price: number
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface SellerApplication {
  businessName: string
  businessType: string
  businessAddress: Address
  taxId: string
  bankAccountNumber: string
  bankName: string
  documents: {
    businessLicense?: File
    taxCertificate?: File
    identityProof?: File
  }
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  submittedDate?: string
  reviewNotes?: string
}
