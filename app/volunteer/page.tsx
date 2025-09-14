"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MockAuth, type User } from "@/lib/auth/mock-auth"

export default function VolunteerPortal() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [acceptedPickups, setAcceptedPickups] = useState<Set<number>>(new Set())

  useEffect(() => {
    const currentUser = MockAuth.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const handleAcceptPickup = (pickupId: number) => {
    setAcceptedPickups((prev) => new Set([...prev, pickupId]))
  }

  const randomMesses = [
    {
      id: 1,
      restaurant: "Om Sharma's Kitchen",
      type: "Sandwiches",
      description: "Fresh sandwiches - 50 pieces",
      location: "Contact: Om Sharma for pickup details",
      distance: "Contact for location",
      time: "Made on 14/9/25 - Available now",
      urgency: "high",
      destination: "Emergency Food Distribution",
      contact: "Om Sharma",
      quantity: "50 Sandwiches",
      madeDate: "14/9/25",
    },
    {
      id: 2,
      restaurant: "Green Garden Cafe",
      type: "Cooked Meals",
      description: "Fresh vegetarian curry and rice - 30 servings",
      location: "123 Main Street, Downtown",
      distance: "0.8 miles",
      time: "Available until 8:00 PM today",
      urgency: "high",
      destination: "Community Food Bank",
    },
    {
      id: 3,
      restaurant: "University Mess Hall",
      type: "Fresh Produce",
      description: "Assorted vegetables and fruits - 15 kg",
      location: "456 Campus Drive",
      distance: "1.2 miles",
      time: "Available until 7:00 PM today",
      urgency: "medium",
      destination: "Local Shelter",
    },
    {
      id: 4,
      restaurant: "Downtown Bistro",
      type: "Baked Goods",
      description: "Fresh bread and pastries - 25 items",
      location: "789 Business Ave",
      distance: "2.1 miles",
      time: "Available until 6:00 PM today",
      urgency: "low",
      destination: "Senior Center",
    },
    {
      id: 5,
      restaurant: "Spice Junction",
      type: "Cooked Meals",
      description: "Indian curry and naan bread - 40 servings",
      location: "321 Food Street",
      distance: "1.5 miles",
      time: "Available until 9:00 PM today",
      urgency: "medium",
      destination: "Youth Center",
    },
    {
      id: 6,
      restaurant: "Fresh Bites Cafe",
      type: "Packaged Food",
      description: "Sealed sandwiches and salads - 20 items",
      location: "654 Market Road",
      distance: "0.9 miles",
      time: "Available until 7:30 PM today",
      urgency: "high",
      destination: "Homeless Shelter",
    },
  ]

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

  if (!user) {
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

  const displayName = user.organizationName || user.contactPerson || user.email.split("@")[0]

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
                  {randomMesses.map((pickup) => (
                    <div
                      key={pickup.id}
                      className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{pickup.restaurant}</h4>
                            <Badge
                              variant={
                                pickup.urgency === "high"
                                  ? "destructive"
                                  : pickup.urgency === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {pickup.urgency === "high"
                                ? "HIGH DEMAND"
                                : pickup.urgency === "medium"
                                  ? "Medium"
                                  : "Low"}{" "}
                              Priority
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-secondary">{pickup.type}</p>
                          <p className="text-sm text-muted-foreground mb-2">{pickup.description}</p>

                          <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              📍 {pickup.location} {pickup.distance && `(${pickup.distance})`}
                            </div>
                            <div className="flex items-center gap-1">🕐 {pickup.time}</div>
                          </div>

                          {pickup.contact && (
                            <div className="mt-2 text-sm">
                              <span className="text-muted-foreground">Contact: </span>
                              <span className="font-medium text-primary">{pickup.contact}</span>
                            </div>
                          )}

                          <div className="mt-2 text-sm">
                            <span className="text-muted-foreground">Deliver to: </span>
                            <span className="font-medium">{pickup.destination}</span>
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
                  ))}
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
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{displayName}</h3>
                  <p className="text-sm text-muted-foreground">New volunteer - just joined!</p>
                </div>

                <div className="space-y-2 text-sm">
                  {user.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">📍 {user.address}</div>
                  )}
                  {user.phone && <div className="flex items-center gap-2 text-muted-foreground">📞 {user.phone}</div>}
                  <div className="flex items-center gap-2 text-muted-foreground">✉️ {user.email}</div>
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
