import { useEffect, useState } from "react"

interface LsType {
  userToken?: string
}

export default function useLocalStorage() {
  const [data, setData] = useState<LsType>({})

  // Getter
  useEffect(() => {
    const userToken = window.localStorage.getItem("userToken") || undefined
    setData({ userToken })
  }, [])

  // Setter
  useEffect(() => {
    const { userToken } = data
    userToken && window.localStorage.setItem("userToken", userToken)
  }, [data])

  const set = {
    userToken: (userToken: string) => setData((data) => ({ ...data, userToken })),
  }

  const isLoggedIn = data.userToken ? true : false

  return { ...data, isLoggedIn, set }
}
