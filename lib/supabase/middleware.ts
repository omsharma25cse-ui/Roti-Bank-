import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  console.log("[v0] Middleware running for:", request.nextUrl.pathname)

  // We'll handle authentication in the components instead
  return NextResponse.next()
}
