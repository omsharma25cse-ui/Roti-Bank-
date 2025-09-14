import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
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
          </div>

          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome to Roti Bank!</CardTitle>
              <CardDescription className="text-center">Check your email to confirm your account</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve sent you a confirmation email. Please check your inbox and click the confirmation link to
                  activate your account and start making a difference with Roti Bank.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or contact support.
                </p>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Back to Login
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
