import type { User, Address, Order, OrderItem } from "./user-types"

export const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  profileImage: "👤",
  joinedDate: "2023-06-15",
  isSeller: false,
}

export const mockAddresses: Address[] = [
  {
    id: 1,
    type: "home",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    type: "work",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    addressLine1: "456 Business Ave",
    addressLine2: "Suite 200",
    city: "New York",
    state: "NY",
    postalCode: "10002",
    country: "United States",
    isDefault: false,
  },
]

const mockOrderItems: OrderItem[] = [
  {
    id: 1,
    productId: 1,
    productName: "Premium Wireless Headphones",
    productImage: "🎧",
    price: 299,
    quantity: 1,
    selectedColor: "Black",
  },
  {
    id: 2,
    productId: 2,
    productName: "Smart Fitness Watch",
    productImage: "⌚",
    price: 199,
    quantity: 2,
    selectedSize: "42mm",
    selectedColor: "Space Gray",
  },
]

export const mockOrders: Order[] = [
  {
    id: "ORD-2024-001234",
    date: "2024-01-15",
    status: "delivered",
    items: mockOrderItems,
    subtotal: 697,
    deliveryFee: 15,
    total: 712,
    shippingAddress: mockAddresses[0],
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-18",
    deliveredDate: "2024-01-17",
  },
  {
    id: "ORD-2024-001235",
    date: "2024-01-20",
    status: "shipped",
    items: [mockOrderItems[0]],
    subtotal: 299,
    deliveryFee: 0,
    total: 299,
    shippingAddress: mockAddresses[1],
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-01-23",
  },
  {
    id: "ORD-2024-001236",
    date: "2024-01-22",
    status: "pending",
    items: [mockOrderItems[1]],
    subtotal: 398,
    deliveryFee: 15,
    total: 413,
    shippingAddress: mockAddresses[0],
    paymentMethod: "Cash on Delivery",
  },
]
