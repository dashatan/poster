import { useEffect, useState } from "react"

export default function useAuth() {
  const [token, setToken] = useState<string | null>()

  useEffect(() => {
    if (typeof window === undefined) return
    setToken(window.localStorage.getItem("userToken"))
  }, [])

  useEffect(() => {
    // token && window.localStorage.setItem("userToken", token)
  }, [token])

  const setUserToken = (token: string) => setToken(token)
  const removeUserToken = () => window.localStorage.removeItem("userToken")

  return {
    userToken: token,
    isLoggedIn: !!token,
    isLoading: token === undefined,
    setUserToken,
    removeUserToken,
  }
}
