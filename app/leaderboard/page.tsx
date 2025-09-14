import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"

export default function LeaderboardPage() {
  const restaurantLeaderboard = [
    {
      rank: 1,
      name: "Green Garden Cafe",
      points: 2450,
      mealsShared: 89,
      location: "Downtown",
      streak: 15,
      badge: "Sustainability Champion",
      medal: "gold",
    },
    {
      rank: 2,
      name: "University Mess Hall",
      points: 2180,
      mealsShared: 76,
      location: "Campus",
      streak: 12,
      badge: "Community Hero",
      medal: "silver",
    },
    {
      rank: 3,
      name: "Downtown Bistro",
      points: 1920,
      mealsShared: 68,
      location: "Business District",
      streak: 8,
      badge: "Waste Warrior",
      medal: "bronze",
    },
    {
      rank: 4,
      name: "Healthy Bites",
      points: 1650,
      mealsShared: 58,
      location: "Midtown",
      streak: 6,
      badge: "Green Partner",
      medal: null,
    },
    {
      rank: 5,
      name: "Community Kitchen",
      points: 1420,
      mealsShared: 52,
      location: "Suburbs",
      streak: 4,
      badge: "Rising Star",
      medal: null,
    },
    {
      rank: 6,
      name: "Fresh & Fast",
      points: 1280,
      mealsShared: 45,
      location: "Mall Area",
      streak: 3,
      badge: "Newcomer",
      medal: null,
    },
    {
      rank: 7,
      name: "Organic Oasis",
      points: 1150,
      mealsShared: 41,
      location: "Health District",
      streak: 7,
      badge: "Eco Friendly",
      medal: null,
    },
    {
      rank: 8,
      name: "Student Canteen",
      points: 980,
      mealsShared: 35,
      location: "University",
      streak: 2,
      badge: "Student Choice",
      medal: null,
    },
  ]

  const volunteerLeaderboard = [
    {
      rank: 1,
      name: "Sarah Johnson",
      completedPickups: 45,
      mealsDelivered: 1250,
      hoursVolunteered: 89,
      badge: "Super Volunteer",
      medal: "gold",
    },
    {
      rank: 2,
      name: "Mike Chen",
      completedPickups: 38,
      mealsDelivered: 1080,
      hoursVolunteered: 76,
      badge: "Delivery Hero",
      medal: "silver",
    },
    {
      rank: 3,
      name: "Emma Davis",
      completedPickups: 32,
      mealsDelivered: 890,
      hoursVolunteered: 65,
      badge: "Community Champion",
      medal: "bronze",
    },
    {
      rank: 4,
      name: "John Doe",
      completedPickups: 28,
      mealsDelivered: 750,
      hoursVolunteered: 58,
      badge: "Reliable Helper",
      medal: null,
    },
    {
      rank: 5,
      name: "Lisa Wang",
      completedPickups: 24,
      mealsDelivered: 680,
      hoursVolunteered: 52,
      badge: "Rising Star",
      medal: null,
    },
  ]

  const getMedalIcon = (medal: string | null) => {
    switch (medal) {
      case "gold":
        return "🥇"
      case "silver":
        return "🥈"
      case "bronze":
        return "🥉"
      default:
        return null
    }
  }

  const getRankIcon = (rank: number, medal: string | null) => {
    const medalIcon = getMedalIcon(medal)
    if (medalIcon) return medalIcon

    switch (rank) {
      case 1:
        return "👑"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return rank.toString()
    }
  }

  const getRankColor = (rank: number, medal: string | null) => {
    if (medal) {
      switch (medal) {
        case "gold":
          return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-lg animate-pulse-green"
        case "silver":
          return "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white shadow-md"
        case "bronze":
          return "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white shadow-md"
      }
    }

    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

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
              <div className="flex items-center gap-3">
                <Image src="/roti-bank-logo.png" alt="Roti Bank Logo" width={32} height={32} className="rounded-full" />
                <h1 className="text-xl font-bold text-foreground">Roti Bank Leaderboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden md:flex">
                📅 Updated Daily
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🏆</span>
            <h1 className="text-3xl font-bold">Community Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrating the restaurants, volunteers, and NGOs making the biggest impact in reducing food waste and
            helping communities.
          </p>
        </div>

        {/* Medal Winners Showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 animate-fade-in-up">🏅 This Month's Medal Winners</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Gold Medal Winner */}
            <Card className="relative overflow-hidden animate-fade-in-up bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="absolute top-4 right-4 text-4xl animate-float">🥇</div>
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white">👑</span>
                </div>
                <CardTitle className="text-xl">Gold Medal</CardTitle>
                <CardDescription className="font-semibold text-yellow-700">Green Garden Cafe</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">2,450 Points</div>
                <div className="text-sm text-muted-foreground">89 meals shared • 15 day streak</div>
              </CardContent>
            </Card>

            {/* Silver Medal Winner */}
            <Card
              className="relative overflow-hidden animate-fade-in-up bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="absolute top-4 right-4 text-4xl animate-float" style={{ animationDelay: "0.2s" }}>
                🥈
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white">🏢</span>
                </div>
                <CardTitle className="text-xl">Silver Medal</CardTitle>
                <CardDescription className="font-semibold text-gray-700">University Mess Hall</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-gray-600 mb-2">2,180 Points</div>
                <div className="text-sm text-muted-foreground">76 meals shared • 12 day streak</div>
              </CardContent>
            </Card>

            {/* Bronze Medal Winner */}
            <Card
              className="relative overflow-hidden animate-fade-in-up bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-4 right-4 text-4xl animate-float" style={{ animationDelay: "0.4s" }}>
                🥉
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white">🍽️</span>
                </div>
                <CardTitle className="text-xl">Bronze Medal</CardTitle>
                <CardDescription className="font-semibold text-amber-700">Downtown Bistro</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-2">1,920 Points</div>
                <div className="text-sm text-muted-foreground">68 meals shared • 8 day streak</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">2,450</div>
              <div className="text-sm text-muted-foreground">Total Meals Saved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">156</div>
              <div className="text-sm text-muted-foreground">Active Restaurants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">89</div>
              <div className="text-sm text-muted-foreground">Volunteers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">23</div>
              <div className="text-sm text-muted-foreground">NGO Partners</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="restaurants" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="restaurants" className="flex items-center gap-2">
              🏆 Restaurants
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              ⭐ Volunteers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🏆 Restaurant Rankings</CardTitle>
                <CardDescription>
                  Restaurants ranked by their contribution to reducing food waste and community impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restaurantLeaderboard.map((restaurant) => (
                    <div
                      key={restaurant.rank}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                        restaurant.medal
                          ? "border-primary/30 bg-primary/5 shadow-sm"
                          : restaurant.rank <= 3
                            ? "border-primary/20 bg-primary/5"
                            : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${getRankColor(restaurant.rank, restaurant.medal)}`}
                          >
                            {getRankIcon(restaurant.rank, restaurant.medal)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                              {restaurant.medal && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    restaurant.medal === "gold"
                                      ? "border-yellow-400 text-yellow-600"
                                      : restaurant.medal === "silver"
                                        ? "border-gray-400 text-gray-600"
                                        : "border-amber-400 text-amber-600"
                                  }`}
                                >
                                  {getMedalIcon(restaurant.medal)}{" "}
                                  {restaurant.medal.charAt(0).toUpperCase() + restaurant.medal.slice(1)} Medal
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {restaurant.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">📍 {restaurant.location}</span>
                              <span>{restaurant.mealsShared} meals shared</span>
                              <span>{restaurant.streak} day streak</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-primary font-bold text-xl">
                            ⭐ {restaurant.points.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">⭐ Volunteer Rankings</CardTitle>
                <CardDescription>
                  Top volunteers making a difference through food collection and distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteerLeaderboard.map((volunteer) => (
                    <div
                      key={volunteer.rank}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                        volunteer.medal
                          ? "border-secondary/30 bg-secondary/5 shadow-sm"
                          : volunteer.rank <= 3
                            ? "border-secondary/20 bg-secondary/5"
                            : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${getRankColor(volunteer.rank, volunteer.medal)}`}
                          >
                            {getRankIcon(volunteer.rank, volunteer.medal)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{volunteer.name}</h3>
                              {volunteer.medal && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    volunteer.medal === "gold"
                                      ? "border-yellow-400 text-yellow-600"
                                      : volunteer.medal === "silver"
                                        ? "border-gray-400 text-gray-600"
                                        : "border-amber-400 text-amber-600"
                                  }`}
                                >
                                  {getMedalIcon(volunteer.medal)}{" "}
                                  {volunteer.medal.charAt(0).toUpperCase() + volunteer.medal.slice(1)} Medal
                                </Badge>
                              )}
                              <Badge variant="secondary" className="text-xs">
                                {volunteer.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{volunteer.completedPickups} pickups</span>
                              <span>{volunteer.mealsDelivered} meals delivered</span>
                              <span>{volunteer.hoursVolunteered} hours</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-secondary font-bold text-xl">
                            📈 {volunteer.completedPickups}
                          </div>
                          <div className="text-xs text-muted-foreground">completed</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <span className="text-4xl mb-4 block">🏆</span>
              <h2 className="text-2xl font-bold mb-4">Join the Leaderboard</h2>
              <p className="text-muted-foreground mb-6">
                Start making a difference today and see your name climb the rankings as you help reduce food waste and
                support your community. Earn medals and recognition for your contributions!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/restaurant">
                  <Button className="w-full sm:w-auto">Join as Restaurant</Button>
                </Link>
                <Link href="/volunteer">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Become a Volunteer
                  </Button>
                </Link>
                <Link href="/ngo">
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                    Partner as NGO
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
