"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!userType) {
      setError("Please select your portal type")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
      } else if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          setError("Failed to load user profile")
        } else if (profile?.user_type !== userType) {
          setError("User type doesn't match your selection")
        } else {
          router.push(`/${userType}`)
        }
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-light-green flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <Image
              src="/roti-bank-logo.png"
              alt="Roti Bank Logo"
              width={80}
              height={80}
              className="mx-auto mb-4 rounded-full"
            />
            <h1 className="text-2xl font-bold text-foreground">Welcome Back to Roti Bank</h1>
            <p className="text-muted-foreground">Sign in to your portal</p>
          </div>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your credentials to access your portal</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="userType">Portal Type</Label>
                    <Select value={userType} onValueChange={setUserType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your portal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant/Mess</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <div className="mt-2 space-y-1">
                    <div>
                      <Link
                        href="/auth/register/restaurant"
                        className="underline underline-offset-4 text-primary hover:text-primary/80"
                      >
                        Register as Restaurant
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/auth/register/volunteer"
                        className="underline underline-offset-4 text-primary hover:text-primary/80"
                      >
                        Register as Volunteer
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/auth/register/ngo"
                        className="underline underline-offset-4 text-primary hover:text-primary/80"
                      >
                        Register as NGO
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
