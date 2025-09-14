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
import { MockAuth, type User } from "@/lib/auth/mock-auth"

export default function NGOPortal() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = MockAuth.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in</h2>
          <p className="text-muted-foreground mb-4">You need to be logged in to access the NGO portal.</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
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
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground">❤️</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">NGO Portal</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden md:flex">
                👥 0 People Served
              </Badge>
              <Button variant="outline" size="sm">
                Organization Profile
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
                Coordinate food distribution, manage requests, and track your impact in the community.
              </p>
            </div>

            {/* Request Food Donation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">➕ Request Food Donation</CardTitle>
                <CardDescription>Submit a request for specific food items needed for your programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="food-needed">Food Type Needed</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select food category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cooked-meals">Cooked Meals</SelectItem>
                        <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                        <SelectItem value="baked-goods">Baked Goods</SelectItem>
                        <SelectItem value="packaged-food">Packaged Food</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="any">Any Available Food</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="people-count">Number of People to Serve</Label>
                    <Input id="people-count" type="number" placeholder="e.g., 100" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="purpose">Purpose/Event</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Describe the event, program, or purpose for the food donation..."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="needed-by">Needed By</Label>
                    <Input id="needed-by" type="datetime-local" />
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Planning ahead</SelectItem>
                        <SelectItem value="medium">Medium - Within a week</SelectItem>
                        <SelectItem value="high">High - Urgent need</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full md:w-auto">➕ Submit Food Request</Button>
              </CardContent>
            </Card>

            {/* Incoming Donations */}
            <Card>
              <CardHeader>
                <CardTitle>Incoming Food Donations</CardTitle>
                <CardDescription>Food deliveries scheduled for your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No incoming donations yet. Submit food requests above to get started!</p>
                </div>
              </CardContent>
            </Card>

            {/* Distribution Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📅 Distribution Schedule</CardTitle>
                <CardDescription>Upcoming food distribution events and programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      event: "Community Lunch Program",
                      date: "Today, 12:00 PM - 2:00 PM",
                      location: "Main Community Center",
                      expectedAttendees: 80,
                      foodNeeded: "Cooked meals, beverages",
                    },
                    {
                      event: "Senior Citizens Meal Delivery",
                      date: "Tomorrow, 11:00 AM - 1:00 PM",
                      location: "Various home addresses",
                      expectedAttendees: 25,
                      foodNeeded: "Packaged meals, fresh produce",
                    },
                    {
                      event: "Youth Center Snack Time",
                      date: "Friday, 3:00 PM - 4:00 PM",
                      location: "Downtown Youth Center",
                      expectedAttendees: 40,
                      foodNeeded: "Baked goods, beverages",
                    },
                  ].map((event, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg bg-accent/5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{event.event}</h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <Badge variant="outline">{event.expectedAttendees} people</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">📍 {event.location}</div>
                        <div>
                          <strong>Food needed:</strong> {event.foodNeeded}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organization Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h3 className="font-semibold">{displayName}</h3>
                  <p className="text-sm text-muted-foreground">New partner - just joined!</p>
                </div>

                <div className="space-y-2 text-sm">
                  {user.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">📍 {user.address}</div>
                  )}
                  {user.phone && <div className="flex items-center gap-2 text-muted-foreground">📞 {user.phone}</div>}
                  <div className="flex items-center gap-2 text-muted-foreground">✉️ {user.email}</div>
                </div>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Update Organization Info
                </Button>
              </CardContent>
            </Card>

            {/* Impact Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">👥 Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">0</div>
                  <div className="text-sm text-muted-foreground">People Served This Month</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold">0</div>
                    <div className="text-xs text-muted-foreground">Meals Distributed</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">0</div>
                    <div className="text-xs text-muted-foreground">Food Donations</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="text-sm text-center text-muted-foreground">
                    <strong className="text-foreground">Welcome!</strong> Start requesting food donations to begin
                    serving your community.
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
                  📅 Schedule Distribution Event
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  👥 Manage Volunteers
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  ➕ Add New Program
                </Button>
              </CardContent>
            </Card>

            {/* Partner Restaurants */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Partner Restaurants</CardTitle>
                <CardDescription>Regular food donors in your area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Green Garden Cafe", donations: 23 },
                  { name: "University Mess Hall", donations: 18 },
                  { name: "Downtown Bistro", donations: 15 },
                  { name: "Healthy Bites", donations: 12 },
                ].map((restaurant, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <span className="font-medium text-sm">{restaurant.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {restaurant.donations} donations
                    </Badge>
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
