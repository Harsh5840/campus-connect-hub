"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/src/contexts/AuthContext"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setTokens } = useAuth()

  useEffect(() => {
    const accessToken = searchParams.get("accessToken")
    const refreshToken = searchParams.get("refreshToken")
    const error = searchParams.get("error")

    if (error) {
      router.push(`/login?error=${error}`)
      return
    }

    if (accessToken && refreshToken) {
      // Store tokens
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      
      // Trigger auth context refresh
      if (setTokens) {
        setTokens(accessToken, refreshToken)
      }
      
      // Redirect to marketplace
      router.push("/marketplace")
    } else {
      router.push("/login?error=missing_tokens")
    }
  }, [searchParams, router, setTokens])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}
