import { useEffect, useState } from "react"
import { useLazyUserQuery, User } from "utils/services/auth"
import useAuth from "./useAuth"
import useLocalStorage from "./useLocalStorage"

export default function useUser() {
  const [userTrigger] = useLazyUserQuery()
  const { userToken } = useAuth()
  const [user, setUser] = useState<User>()
  const [isLoading, setLoading] = useState(true)

  async function getUser(userToken: string) {
    try {
      const data = await userTrigger(userToken, true).unwrap()
      setUser(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof userToken !== "string") return
    getUser(userToken)
  }, [userToken])

  return { user, isLoading }
}
