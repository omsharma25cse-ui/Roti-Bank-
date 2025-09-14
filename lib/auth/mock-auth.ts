// Mock authentication system for demo purposes
export interface User {
  id: string
  email: string
  userType: "restaurant" | "volunteer" | "ngo"
  organizationName?: string
  contactPerson?: string
  phone?: string
  address?: string
}

export class MockAuth {
  private static users: User[] = []

  static async signUp(userData: {
    email: string
    password: string
    userType: "restaurant" | "volunteer" | "ngo"
    organizationName?: string
    contactPerson?: string
    phone?: string
    address?: string
  }): Promise<{ user: User | null; error: string | null }> {
    // Check if user already exists
    const existingUser = this.users.find((u) => u.email === userData.email)
    if (existingUser) {
      return { user: null, error: "User already exists" }
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      userType: userData.userType,
      organizationName: userData.organizationName,
      contactPerson: userData.contactPerson,
      phone: userData.phone,
      address: userData.address,
    }

    this.users.push(newUser)

    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("mockUsers", JSON.stringify(this.users))
      localStorage.setItem("currentUser", JSON.stringify(newUser))
    }

    return { user: newUser, error: null }
  }

  static async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    // Load users from localStorage if available
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("mockUsers")
      if (storedUsers) {
        this.users = JSON.parse(storedUsers)
      }
    }

    const user = this.users.find((u) => u.email === email)
    if (!user) {
      return { user: null, error: "Invalid credentials" }
    }

    // Store current user
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user))
    }

    return { user, error: null }
  }

  static getCurrentUser(): User | null {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser")
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  }

  static signOut(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }
  }
}
