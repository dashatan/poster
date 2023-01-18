import { useEffect, useState } from "react"
import { useAppDispatch } from "utils/hooks"
import { authSlice } from "utils/services/auth"

export default function useAuth() {
  const [token, setToken] = useState<string | null>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof window === undefined) return
    setToken(window.localStorage.getItem("userToken"))
  }, [])

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("userToken", token)
    }
    dispatch(authSlice.actions.authToken(token))
  }, [token])

  const setUserToken = (token: string | null) => setToken(token)
  const removeUserToken = () => window.localStorage.removeItem("userToken")

  return {
    userToken: token,
    isLoggedIn:
      token === undefined ? "pending" : typeof token === "string" ? true : false,
    isLoading: token === undefined,
    setUserToken,
    removeUserToken,
  }
}
