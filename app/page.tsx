import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/roti-bank-logo.png" alt="Roti Bank Logo" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-foreground">Roti Bank</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Leaderboard
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/food-sharing-hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95"></div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge variant="secondary" className="mb-6 animate-pulse-green">
            Turning Food Waste into Hope
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 animate-fade-in-up">
            Connect. Share. <span className="text-primary">Transform Lives.</span>
          </h1>
          <p
            className="text-xl text-muted-foreground text-pretty mb-12 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Join Roti Bank's mission to eliminate food waste by connecting restaurants, volunteers, and NGOs in a
            sustainable ecosystem that feeds communities and rewards generosity.
          </p>

          {/* Portal Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-float backdrop-blur-sm bg-card/90">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">🏢</span>
                </div>
                <CardTitle className="text-xl">Restaurants & Mess</CardTitle>
                <CardDescription>Share surplus food and earn rewards through our leaderboard system</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/auth/register/restaurant">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">Join as Restaurant →</Button>
                </Link>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-float backdrop-blur-sm bg-card/90"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <span className="text-2xl">👥</span>
                </div>
                <CardTitle className="text-xl">Volunteers</CardTitle>
                <CardDescription>
                  Help collect and distribute food to make a real difference in your community
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/auth/register/volunteer">
                  <Button variant="secondary" className="w-full group-hover:bg-secondary/90 transition-colors">
                    Volunteer Now →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-float backdrop-blur-sm bg-card/90"
              style={{ animationDelay: "0.4s" }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <span className="text-2xl">❤️</span>
                </div>
                <CardTitle className="text-xl">NGOs</CardTitle>
                <CardDescription>
                  Partner with us to receive food donations and coordinate distribution efforts
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/auth/register/ngo">
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors bg-transparent"
                  >
                    Partner with Us →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/restaurant-kitchen.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-card/80"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Our Impact So Far</h2>
            <p
              className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Together, we're making a significant difference in reducing food waste and helping communities.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-primary mb-2">2,450</div>
              <div className="text-muted-foreground">Meals Saved</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-secondary mb-2">156</div>
              <div className="text-muted-foreground">Partner Restaurants</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-4xl font-bold text-accent mb-2">89</div>
              <div className="text-muted-foreground">Active Volunteers</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="text-4xl font-bold text-primary mb-2">23</div>
              <div className="text-muted-foreground">NGO Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section id="leaderboard" className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: "url('/volunteers-distributing.jpg')",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🏆</span>
              <h2 className="text-3xl font-bold">Top Contributors</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Celebrating restaurants that are leading the fight against food waste
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🏆</span>
                  Restaurant Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Green Garden Cafe", points: 2450, rank: 1 },
                    { name: "University Mess Hall", points: 2180, rank: 2 },
                    { name: "Downtown Bistro", points: 1920, rank: 3 },
                    { name: "Healthy Bites", points: 1650, rank: 4 },
                    { name: "Community Kitchen", points: 1420, rank: 5 },
                  ].map((restaurant) => (
                    <div key={restaurant.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            restaurant.rank === 1
                              ? "bg-primary text-primary-foreground"
                              : restaurant.rank === 2
                                ? "bg-secondary text-secondary-foreground"
                                : restaurant.rank === 3
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {restaurant.rank}
                        </div>
                        <span className="font-medium">{restaurant.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⭐</span>
                        <span className="font-bold text-primary">{restaurant.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/leaderboard">
                    <Button variant="outline">View Full Leaderboard →</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/roti-bank-logo.png" alt="Roti Bank Logo" width={32} height={32} className="rounded-full" />
                <h3 className="text-lg font-bold">Roti Bank</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Turning food waste into hope by connecting communities and transforming surplus into sustenance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Restaurants</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/register/restaurant" className="hover:text-foreground transition-colors">
                    Join Platform
                  </Link>
                </li>
                <li>
                  <Link href="/restaurant/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/rewards" className="hover:text-foreground transition-colors">
                    Rewards Program
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/register/volunteer" className="hover:text-foreground transition-colors">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register/ngo" className="hover:text-foreground transition-colors">
                    NGO Partnership
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:rotibank@gmail.com" className="hover:text-foreground transition-colors">
                    rotibank@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919045863109" className="hover:text-foreground transition-colors">
                    +91 9045863109
                  </a>
                </li>
                <li className="text-xs">
                  BML Munjal University
                  <br />
                  Kapriwas, Haryana
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Roti Bank. All rights reserved. Built with ❤️ to turn food waste into hope.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
