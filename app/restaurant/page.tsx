"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"

interface Profile {
  id: string
  user_type: string
  organization_name: string | null
  contact_person: string | null
  phone: string | null
  address: string | null
  points: number
}

export default function RestaurantPortal() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [foodListed, setFoodListed] = useState(false)
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    description: "",
    pickupTime: "",
    contact: "",
  })

  const handleListFood = async () => {
    if (!profile) return

    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("food_listings").insert({
        restaurant_id: profile.id,
        title: formData.foodType,
        description: formData.description,
        quantity: formData.quantity,
        expiry_time: formData.pickupTime,
        pickup_location: profile.address || "Restaurant location",
        status: "available",
      })

      if (error) {
        console.error("Error listing food:", error)
        return
      }

      setFoodListed(true)
      setFormData({
        foodType: "",
        quantity: "",
        description: "",
        pickupTime: "",
        contact: "",
      })
      setTimeout(() => {
        setFoodListed(false)
      }, 3000)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          redirect("/auth/login")
          return
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) {
          console.error("Error loading profile:", profileError)
          redirect("/auth/login")
          return
        }

        if (profileData.user_type !== "restaurant") {
          redirect("/auth/login")
          return
        }

        setProfile(profileData)
      } catch (error) {
        console.error("Error:", error)
        redirect("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in</h2>
          <p className="text-muted-foreground mb-4">You need to be logged in to access the restaurant portal.</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  const displayName = profile.organization_name || profile.contact_person || "Restaurant"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground">🏢</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">Restaurant Portal</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden md:flex">
                ⭐ {profile.points} Points
              </Badge>
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold mb-4">Welcome to Roti Bank, {displayName}!</h1>
              <p className="text-muted-foreground text-lg">
                Join our mission to reduce food waste while earning rewards and recognition for your contributions.
              </p>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">➕</span>
                  Share Food Today
                </CardTitle>
                <CardDescription>
                  List surplus food items that can be collected by volunteers and distributed to NGOs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {foodListed && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <span className="text-green-600">✅</span>
                      <span className="font-medium">Food Listed Successfully!</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Your food donation has been added and volunteers will be notified.
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="food-type">Food Type</Label>
                    <Select
                      value={formData.foodType}
                      onValueChange={(value) => setFormData({ ...formData, foodType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select food category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cooked-meals">Cooked Meals</SelectItem>
                        <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                        <SelectItem value="baked-goods">Baked Goods</SelectItem>
                        <SelectItem value="packaged-food">Packaged Food</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Estimated Servings</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Food Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the food items, any dietary restrictions, storage requirements..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-time">Available Until</Label>
                    <Input
                      id="pickup-time"
                      type="datetime-local"
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input
                      id="contact"
                      placeholder="Name and phone number"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>
                </div>

                <Button className="w-full md:w-auto" onClick={handleListFood}>
                  ➕ List Food for Sharing
                </Button>
              </CardContent>
            </Card>

            {/* Current Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Your Active Listings</CardTitle>
                <CardDescription>Food items currently available for pickup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No active listings yet. Use the form above to share your first food donation!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Restaurant Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Restaurant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="font-semibold">{displayName}</h3>
                  <p className="text-sm text-muted-foreground">Restaurant Partner</p>
                </div>

                <div className="space-y-2 text-sm">
                  {profile.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">📍 {profile.address}</div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">📞 {profile.phone}</div>
                  )}
                  {profile.contact_person && (
                    <div className="flex items-center gap-2 text-muted-foreground">👤 {profile.contact_person}</div>
                  )}
                </div>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Points & Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">🏆 Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{profile.points}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold">-</div>
                    <div className="text-xs text-muted-foreground">Current Rank</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">0</div>
                    <div className="text-xs text-muted-foreground">Meals Shared</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="text-sm text-center text-muted-foreground">
                    <strong className="text-foreground">Get started!</strong> Share your first meal to earn points and
                    climb the leaderboard.
                  </div>
                </div>

                <Link href="/leaderboard">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    📈 View Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Available Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">🎁 Available Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Featured Listing", points: 500, description: "Highlight your restaurant" },
                  { name: "Sustainability Badge", points: 1000, description: "Show your eco commitment" },
                  { name: "Premium Support", points: 1500, description: "Priority customer service" },
                ].map((reward, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{reward.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {reward.points} pts
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{reward.description}</p>
                  </div>
                ))}

                <Link href="/rewards">
                  <Button variant="secondary" size="sm" className="w-full">
                    View All Rewards
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
