"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface FoodListing {
  id: string
  title: string
  description: string
  quantity: string
  expiry_time: string
  pickup_location: string
  status: string
  created_at: string
  profiles: {
    organization_name: string | null
    contact_person: string | null
    phone: string | null
  }
}

export default function VolunteerPortal() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [foodListings, setFoodListings] = useState<FoodListing[]>([])
  const [loading, setLoading] = useState(true)
  const [acceptedPickups, setAcceptedPickups] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadData = async () => {
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

        if (profileData.user_type !== "volunteer") {
          redirect("/auth/login")
          return
        }

        setProfile(profileData)

        // Load available food listings
        const { data: listingsData, error: listingsError } = await supabase
          .from("food_listings")
          .select(`
            *,
            profiles!food_listings_restaurant_id_fkey (
              organization_name,
              contact_person,
              phone
            )
          `)
          .eq("status", "available")
          .order("created_at", { ascending: false })

        if (listingsError) {
          console.error("Error loading food listings:", listingsError)
        } else {
          setFoodListings(listingsData || [])
        }
      } catch (error) {
        console.error("Error:", error)
        redirect("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAcceptPickup = async (listingId: string) => {
    if (!profile) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("food_listings")
        .update({
          volunteer_id: profile.id,
          status: "accepted",
        })
        .eq("id", listingId)

      if (error) {
        console.error("Error accepting pickup:", error)
        return
      }

      setAcceptedPickups((prev) => new Set([...prev, listingId]))

      // Remove from available listings
      setFoodListings((prev) => prev.filter((listing) => listing.id !== listingId))
    } catch (error) {
      console.error("Error:", error)
    }
  }

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
          <p className="text-muted-foreground mb-4">You need to be logged in to access the volunteer portal.</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const displayName = profile.organization_name || profile.contact_person || "Volunteer"

  // Add the high demand listing at the top
  const highDemandListing = {
    id: "high-demand-1",
    title: "Sandwiches",
    description: "Fresh sandwiches - 50 pieces",
    quantity: "50",
    expiry_time: new Date().toISOString(),
    pickup_location: "Contact: Om Sharma for pickup details",
    status: "available",
    created_at: "2025-09-14T00:00:00Z",
    profiles: {
      organization_name: "Om Sharma's Kitchen",
      contact_person: "Om Sharma",
      phone: "+91 9876543210",
    },
  }

  const allListings = [highDemandListing, ...foodListings]

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
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground">👥</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">Volunteer Portal</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden md:flex">
                ✅ 0 Completed
              </Badge>
              <Button variant="outline" size="sm">
                My Profile
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
              <h1 className="text-3xl font-bold mb-4">Welcome back, {displayName}!</h1>
              <p className="text-muted-foreground text-lg">
                Help collect and distribute surplus food to those who need it most. Every pickup makes an impact.
              </p>
            </div>

            {/* Available Pickups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📍 Available Food Pickups</CardTitle>
                <CardDescription>
                  Choose from available food donations that need to be collected and delivered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allListings.map((pickup, index) => {
                    const isHighDemand = pickup.id === "high-demand-1"
                    const restaurantName = pickup.profiles?.organization_name || "Restaurant"
                    const contactPerson = pickup.profiles?.contact_person || "Contact"
                    const isExpiringSoon = new Date(pickup.expiry_time) < new Date(Date.now() + 2 * 60 * 60 * 1000)

                    return (
                      <div
                        key={pickup.id}
                        className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{restaurantName}</h4>
                              <Badge
                                variant={isHighDemand || isExpiringSoon ? "destructive" : "default"}
                                className="text-xs"
                              >
                                {isHighDemand ? "HIGH DEMAND" : isExpiringSoon ? "URGENT" : "Available"}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-secondary">{pickup.title}</p>
                            <p className="text-sm text-muted-foreground mb-2">{pickup.description}</p>

                            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">📍 {pickup.pickup_location}</div>
                              <div className="flex items-center gap-1">
                                🕐{" "}
                                {isHighDemand
                                  ? "Made on 14/9/25 - Available now"
                                  : `Available until ${new Date(pickup.expiry_time).toLocaleTimeString()}`}
                              </div>
                            </div>

                            <div className="mt-2 text-sm">
                              <span className="text-muted-foreground">Contact: </span>
                              <span className="font-medium text-primary">{contactPerson}</span>
                            </div>

                            <div className="mt-2 text-sm">
                              <span className="text-muted-foreground">Quantity: </span>
                              <span className="font-medium">{pickup.quantity} servings</span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            {acceptedPickups.has(pickup.id) ? (
                              <Button size="sm" className="whitespace-nowrap bg-green-600 hover:bg-green-700" disabled>
                                ✅ Pickup Accepted
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="whitespace-nowrap"
                                onClick={() => handleAcceptPickup(pickup.id)}
                              >
                                Accept Pickup
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
                              📍 View Route
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {allListings.length === 1 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No additional pickups available at the moment. Check back soon!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* My Active Pickups */}
            <Card>
              <CardHeader>
                <CardTitle>My Active Pickups</CardTitle>
                <CardDescription>Food collections you've committed to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No active pickups yet. Accept a pickup above to get started!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Volunteer Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src="/volunteer-profile.jpg" />
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{displayName}</h3>
                  <p className="text-sm text-muted-foreground">Volunteer</p>
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
                  Update Availability
                </Button>
              </CardContent>
            </Card>

            {/* Volunteer Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">✅ Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">0</div>
                  <div className="text-sm text-muted-foreground">Completed Pickups</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold">0</div>
                    <div className="text-xs text-muted-foreground">Meals Delivered</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">0</div>
                    <div className="text-xs text-muted-foreground">Hours Volunteered</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="text-sm text-center text-muted-foreground">
                    <strong className="text-foreground">Welcome!</strong> Start accepting pickups to make your first
                    impact.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  📅 Schedule Regular Pickups
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  👥 Invite Friends to Volunteer
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  ⚠️ Report an Issue
                </Button>
              </CardContent>
            </Card>

            {/* Nearby NGOs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Partner NGOs</CardTitle>
                <CardDescription>Organizations you help deliver to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Community Food Bank", distance: "0.5 miles" },
                  { name: "Local Shelter", distance: "1.1 miles" },
                  { name: "Senior Center", distance: "1.8 miles" },
                ].map((ngo, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <span className="font-medium text-sm">{ngo.name}</span>
                    <span className="text-xs text-muted-foreground">{ngo.distance}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
