import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function RewardsPage() {
  const availableRewards = [
    {
      id: 1,
      name: "Featured Listing",
      description: "Get your restaurant highlighted on the homepage for 7 days",
      points: 500,
      category: "Visibility",
      icon: "⭐",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      available: true,
    },
    {
      id: 2,
      name: "Sustainability Badge",
      description: "Display an eco-friendly badge on your restaurant profile",
      points: 1000,
      category: "Recognition",
      icon: "🛡️",
      color: "text-green-500",
      bgColor: "bg-green-50",
      available: true,
    },
    {
      id: 3,
      name: "Premium Support",
      description: "Get priority customer service and dedicated account manager",
      points: 1500,
      category: "Support",
      icon: "👑",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      available: true,
    },
    {
      id: 4,
      name: "Marketing Kit",
      description: "Receive branded materials to promote your sustainability efforts",
      points: 2000,
      category: "Marketing",
      icon: "✨",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      available: false,
    },
    {
      id: 5,
      name: "Exclusive Events",
      description: "Invitation to sustainability conferences and networking events",
      points: 2500,
      category: "Networking",
      icon: "🏆",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      available: false,
    },
    {
      id: 6,
      name: "Carbon Credit Certificate",
      description: "Official certificate recognizing your environmental impact",
      points: 3000,
      category: "Certification",
      icon: "⚡",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      available: false,
    },
  ]

  const claimedRewards = [
    {
      name: "Featured Listing",
      claimedDate: "March 15, 2024",
      status: "Active",
      expiryDate: "March 22, 2024",
    },
    {
      name: "Sustainability Badge",
      claimedDate: "February 28, 2024",
      status: "Permanent",
      expiryDate: null,
    },
  ]

  const milestones = [
    { points: 500, reward: "Featured Listing", achieved: true },
    { points: 1000, reward: "Sustainability Badge", achieved: true },
    { points: 1500, reward: "Premium Support", achieved: false },
    { points: 2000, reward: "Marketing Kit", achieved: false },
    { points: 2500, reward: "Exclusive Events", achieved: false },
    { points: 3000, reward: "Carbon Credit Certificate", achieved: false },
  ]

  const currentPoints = 1250
  const nextMilestone = milestones.find((m) => !m.achieved)
  const progressToNext = nextMilestone ? (currentPoints / nextMilestone.points) * 100 : 100

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
                  <span className="text-secondary-foreground">🎁</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">Rewards Center</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden md:flex">
                ⭐ 1,250 Points Available
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🎁</span>
            <h1 className="text-3xl font-bold">Rewards & Recognition</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Earn points for every meal you share and unlock exclusive rewards that help grow your business and
            recognition.
          </p>
        </div>

        {/* Points Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">{currentPoints.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Available Points</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">89</div>
                <div className="text-sm text-muted-foreground">Meals Shared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">2</div>
                <div className="text-sm text-muted-foreground">Rewards Claimed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress to Next Reward */}
        {nextMilestone && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⭐ Next Milestone</CardTitle>
              <CardDescription>Your progress towards the next reward</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{nextMilestone.reward}</span>
                  <Badge variant="outline">{nextMilestone.points} points</Badge>
                </div>
                <Progress value={progressToNext} className="h-3" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {currentPoints} / {nextMilestone.points} points
                  </span>
                  <span>{nextMilestone.points - currentPoints} points to go</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rewards Tabs */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="claimed">Claimed</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRewards.map((reward) => (
                <Card
                  key={reward.id}
                  className={`transition-all hover:shadow-lg ${
                    reward.available ? "hover:-translate-y-1" : "opacity-60"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-3 rounded-lg ${reward.bgColor}`}>
                        <span className="text-2xl">{reward.icon}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {reward.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{reward.name}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-secondary font-bold">⭐ {reward.points} points</div>
                      {reward.available ? (
                        currentPoints >= reward.points ? (
                          <Button size="sm">Claim Reward</Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled className="bg-transparent">
                            🔒 Locked
                          </Button>
                        )
                      ) : (
                        <Button size="sm" variant="outline" disabled className="bg-transparent">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="claimed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">✅ Your Claimed Rewards</CardTitle>
                <CardDescription>Rewards you've successfully claimed and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claimedRewards.map((reward, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg bg-green-50/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{reward.name}</h4>
                        <Badge variant={reward.status === "Active" ? "default" : "secondary"}>{reward.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Claimed: {reward.claimedDate}</div>
                        {reward.expiryDate && <div>Expires: {reward.expiryDate}</div>}
                      </div>
                    </div>
                  ))}
                  {claimedRewards.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <span className="text-4xl block mb-4 opacity-50">🎁</span>
                      <p>No rewards claimed yet. Start earning points to unlock rewards!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🏆 Reward Milestones</CardTitle>
                <CardDescription>Track your progress through all available reward tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                          milestone.achieved
                            ? "bg-green-500 text-white"
                            : currentPoints >= milestone.points
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {milestone.achieved ? "✅" : "⭐"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{milestone.reward}</h4>
                          <Badge variant="outline">{milestone.points} points</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {milestone.achieved
                            ? "Completed"
                            : currentPoints >= milestone.points
                              ? "Ready to claim"
                              : `${milestone.points - currentPoints} points needed`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* How to Earn Points */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">⚡ How to Earn Points</CardTitle>
            <CardDescription>Different ways to accumulate points and unlock rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">+50</div>
                <div className="text-sm font-medium mb-1">Share a Meal</div>
                <div className="text-xs text-muted-foreground">Per meal shared with community</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-2">+100</div>
                <div className="text-sm font-medium mb-1">Daily Streak</div>
                <div className="text-xs text-muted-foreground">Bonus for consecutive days</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-accent mb-2">+200</div>
                <div className="text-sm font-medium mb-1">Weekly Goal</div>
                <div className="text-xs text-muted-foreground">Complete weekly sharing target</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">+500</div>
                <div className="text-sm font-medium mb-1">Special Events</div>
                <div className="text-xs text-muted-foreground">Participate in community events</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
