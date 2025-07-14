"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { UserDashboardNav } from "@/components/user-dashboard-nav"

const passwordRequirements = [
  { text: "At least 8 characters long", regex: /.{8,}/ },
  { text: "Contains uppercase letter", regex: /[A-Z]/ },
  { text: "Contains lowercase letter", regex: /[a-z]/ },
  { text: "Contains a number", regex: /\d/ },
  { text: "Contains special character", regex: /[!@#$%^&*(),.?":{}|<>]/ },
]

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const getPasswordStrength = (password: string) => {
    const validRequirements = passwordRequirements.filter((req) => req.regex.test(password))
    return validRequirements.length
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak"
    if (strength < 4) return "Medium"
    return "Strong"
  }

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Reset form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    alert("Password changed successfully!")
  }

  const passwordStrength = getPasswordStrength(formData.newPassword)
  const isFormValid =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword &&
    passwordStrength >= 4

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton title="Change Password" />

      <UserDashboardNav>
        <div className="space-y-8">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">Change Password</h1>
            <p className="text-muted-foreground">Update your password to keep your account secure</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Password Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Update Password</h3>
                      <p className="text-sm text-muted-foreground">Enter your current password and choose a new one</p>
                    </div>
                  </div>

                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password *</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                        placeholder="Enter your current password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password *</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                        placeholder="Enter your new password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.newPassword && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Password strength:</span>
                          <span
                            className={`font-medium ${
                              passwordStrength < 2
                                ? "text-red-600"
                                : passwordStrength < 4
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {getStrengthText(passwordStrength)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm your new password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>

                    {/* Password Match Indicator */}
                    {formData.confirmPassword && (
                      <div
                        className={`text-sm ${
                          formData.newPassword === formData.confirmPassword ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {formData.newPassword === formData.confirmPassword
                          ? "✓ Passwords match"
                          : "✗ Passwords don't match"}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSubmit}
                      disabled={!isFormValid || isLoading}
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          ⏳
                        </motion.div>
                      ) : (
                        <Shield className="h-4 w-4 mr-2" />
                      )}
                      {isLoading ? "Updating Password..." : "Update Password"}
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Password Requirements & Security Tips */}
            <div className="space-y-6">
              {/* Password Requirements */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Password Requirements</h3>
                  <div className="space-y-3">
                    {passwordRequirements.map((requirement, index) => {
                      const isValid = formData.newPassword && requirement.regex.test(formData.newPassword)

                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isValid ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <Check className="h-3 w-3" />
                          </div>
                          <span className={`text-sm ${isValid ? "text-green-600" : "text-muted-foreground"}`}>
                            {requirement.text}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* Security Tips */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Security Tips
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Use a unique password that you don't use elsewhere</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Consider using a password manager</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Enable two-factor authentication for extra security</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Change your password regularly</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </UserDashboardNav>
    </div>
  )
}
