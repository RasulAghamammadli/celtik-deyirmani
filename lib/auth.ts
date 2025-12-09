"use client"

// Simple auth context for demo purposes
// In production, use NextAuth.js or similar

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isAuthenticated") === "true"
  }
  return false
}

export const login = (username: string, password: string) => {
  // Demo credentials
  if (username === "admin" && password === "admin") {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", username)
    }
    return true
  }
  return false
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
  }
}

