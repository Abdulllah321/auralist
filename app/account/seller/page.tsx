"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Store,
  TrendingUp,
  Users,
  DollarSign,
  Upload,
  FileText,
  Building,
  CreditCard,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { UserDashboardNav } from "@/components/user-dashboard-nav"
import { mockUser } from "@/lib/mock-user-data"
import type { SellerApplication } from "@/lib/user-types"

const sellerBenefits = [
  {
    icon: TrendingUp,
    title: "Reach Millions",
    description: "Access to our large customer base across multiple countries",
  },
  {
    icon: DollarSign,
    title: "Competitive Fees",
    description: "Low commission rates and transparent pricing structure",
  },
  {
    icon: Users,
    title: "Marketing Support",
    description: "Promotional tools and marketing campaigns to boost your sales",
  },
  {
    icon: Store,
    title: "Easy Management",
    description: "Intuitive seller dashboard to manage inventory and orders",
  },
]

const requirements = [
  "Valid business registration or tax ID",
  "Bank account for payments",
  "Product catalog with high-quality images",
  "Ability to fulfill orders within 2-3 business days",
  "Customer service capabilities",
]

export default function SellerPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [application, setApplication] = useState<Partial<SellerApplication>>({
    businessName: "",
    businessType: "",
    taxId: "",
    bankAccountNumber: "",
    bankName: "",
    businessAddress: {
      id: 0,
      type: "other",
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      isDefault: false,
    },
    status: "draft",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("businessAddress.")) {
      const addressField = field.split(".")[1]
      setApplication((prev) => ({
        ...prev,
        businessAddress: {
          ...prev.businessAddress!,
          [addressField]: value,
        },
      }))
    } else {
      setApplication((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmitApplication = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setApplication((prev) => ({ ...prev, status: "submitted", submittedDate: new Date().toISOString() }))
    setActiveTab("status")
  }

  const isFormValid =
    application.businessName &&
    application.businessType &&
    application.taxId &&
    application.bankAccountNumber &&
    application.bankName &&
    application.businessAddress?.addressLine1 &&
    application.businessAddress?.city &&
    application.businessAddress?.state &&
    application.businessAddress?.postalCode

  if (mockUser.isSeller) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton title="Seller Dashboard" />

        <UserDashboardNav>
          <div className="space-y-8">
            {/* Seller Dashboard */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                  <p className="text-muted-foreground">Manage your store and track performance</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Sales", value: "$12,450", icon: DollarSign, color: "text-green-600" },
                  { label: "Orders", value: "156", icon: Store, color: "text-blue-600" },
                  { label: "Products", value: "23", icon: FileText, color: "text-purple-600" },
                  { label: "Rating", value: "4.8", icon: TrendingUp, color: "text-orange-600" },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                          <Icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Add Product", description: "List a new product in your store", icon: Upload },
                  { title: "Manage Orders", description: "View and process customer orders", icon: Store },
                  { title: "View Analytics", description: "Track your store performance", icon: TrendingUp },
                ].map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{action.title}</div>
                            <div className="text-sm text-muted-foreground">{action.description}</div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </UserDashboardNav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title="Become a Seller" />

      <UserDashboardNav>
        <div className="space-y-8">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏪</div>
              <h1 className="text-3xl font-bold mb-4">Start Selling on ModernStore</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of sellers and reach millions of customers worldwide. Turn your products into a thriving
                business.
              </p>
            </div>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="application">Apply Now</TabsTrigger>
              <TabsTrigger value="status">Application Status</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Benefits */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-semibold mb-6">Why Sell With Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sellerBenefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Card className="p-6 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                              <p className="text-muted-foreground">{benefit.description}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Requirements to Get Started</h3>
                  <div className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>{requirement}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <Button
                      onClick={() => setActiveTab("application")}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Start Application
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="application" className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Seller Application</h3>

                  <div className="space-y-8">
                    {/* Business Information */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <Building className="h-4 w-4 mr-2 text-primary" />
                        Business Information
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            value={application.businessName}
                            onChange={(e) => handleInputChange("businessName", e.target.value)}
                            placeholder="Enter your business name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessType">Business Type *</Label>
                          <Select
                            value={application.businessType}
                            onValueChange={(value) => handleInputChange("businessType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Individual/Sole Proprietorship</SelectItem>
                              <SelectItem value="llc">LLC</SelectItem>
                              <SelectItem value="corporation">Corporation</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="taxId">Tax ID / EIN *</Label>
                          <Input
                            id="taxId"
                            value={application.taxId}
                            onChange={(e) => handleInputChange("taxId", e.target.value)}
                            placeholder="Enter your tax ID"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Business Address */}
                    <div>
                      <h4 className="font-semibold mb-4">Business Address</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="addressLine1">Address Line 1 *</Label>
                          <Input
                            id="addressLine1"
                            value={application.businessAddress?.addressLine1}
                            onChange={(e) => handleInputChange("businessAddress.addressLine1", e.target.value)}
                            placeholder="Street address"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="addressLine2">Address Line 2</Label>
                          <Input
                            id="addressLine2"
                            value={application.businessAddress?.addressLine2}
                            onChange={(e) => handleInputChange("businessAddress.addressLine2", e.target.value)}
                            placeholder="Apartment, suite, etc. (optional)"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={application.businessAddress?.city}
                            onChange={(e) => handleInputChange("businessAddress.city", e.target.value)}
                            placeholder="City"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={application.businessAddress?.state}
                            onChange={(e) => handleInputChange("businessAddress.state", e.target.value)}
                            placeholder="State"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code *</Label>
                          <Input
                            id="postalCode"
                            value={application.businessAddress?.postalCode}
                            onChange={(e) => handleInputChange("businessAddress.postalCode", e.target.value)}
                            placeholder="Postal code"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Select
                            value={application.businessAddress?.country}
                            onValueChange={(value) => handleInputChange("businessAddress.country", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Banking Information */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-primary" />
                        Banking Information
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name *</Label>
                          <Input
                            id="bankName"
                            value={application.bankName}
                            onChange={(e) => handleInputChange("bankName", e.target.value)}
                            placeholder="Enter your bank name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bankAccountNumber">Account Number *</Label>
                          <Input
                            id="bankAccountNumber"
                            value={application.bankAccountNumber}
                            onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
                            placeholder="Enter account number"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Document Upload */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        Required Documents
                      </h4>

                      <div className="space-y-4">
                        {[
                          { key: "businessLicense", label: "Business License", required: true },
                          { key: "taxCertificate", label: "Tax Certificate", required: true },
                          { key: "identityProof", label: "Identity Proof", required: true },
                        ].map((doc) => (
                          <div key={doc.key} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">
                                {doc.label} {doc.required && <span className="text-red-500">*</span>}
                              </div>
                              <div className="text-sm text-muted-foreground">Upload a clear image or PDF file</div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleSubmitApplication}
                          disabled={!isFormValid || isSubmitting}
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="mr-2"
                            >
                              ⏳
                            </motion.div>
                          ) : (
                            <Store className="h-4 w-4 mr-2" />
                          )}
                          {isSubmitting ? "Submitting Application..." : "Submit Application"}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="status" className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8 text-center">
                  {application.status === "submitted" ? (
                    <>
                      <div className="text-6xl mb-4">📋</div>
                      <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for your application. We'll review it within 2-3 business days and get back to you via
                        email.
                      </p>
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                        Under Review
                      </Badge>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                      <p className="text-muted-foreground mb-6">
                        Complete your seller application to start selling on ModernStore.
                      </p>
                      <Button onClick={() => setActiveTab("application")} className="bg-primary hover:bg-primary/90">
                        Start Application
                      </Button>
                    </>
                  )}
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </UserDashboardNav>
    </div>
  )
}
