import { useEffect, useState } from "react"
import { useLazyUserQuery, User } from "utils/services/auth"
import useAuth from "./useAuth"

export default function useUser() {
  const [userTrigger] = useLazyUserQuery()
  const { userToken, removeUserToken, setUserToken } = useAuth()
  const [user, setUser] = useState<User>()
  const [isLoading, setLoading] = useState(true)

  async function getUser(userToken: string) {
    try {
      const data = await userTrigger(userToken, true).unwrap()
      if (data === undefined || data === null) {
        noUser()
      } else {
        setUser(data)
        setLoading(false)
      }
    } catch (error) {
      noUser()
      console.log(error)
    }
  }

  async function logout() {
    setUserToken(null)
    removeUserToken()
  }

  function noUser() {
    removeUserToken()
    setUserToken(null)
    setUser(undefined)
    setLoading(false)
  }

  useEffect(() => {
    if (typeof userToken === "string") {
      getUser(userToken)
    } else {
      setUser(undefined)
      setLoading(false)
    }
  }, [userToken])

  return { user, isLoading, logout, getUser }
}
