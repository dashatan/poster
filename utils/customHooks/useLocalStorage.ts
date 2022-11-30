import { useEffect, useState } from "react"

interface LsType {
  userToken: string | null | undefined
}

export default function useLocalStorage() {
  const [data, setData] = useState<LsType>({ userToken: undefined })

  // Getter
  useEffect(() => {
    const userToken = window.localStorage.getItem("userToken")
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
  const token = data.userToken
  const isLoggedIn = token === undefined ? undefined : token === null ? false : true

  return { ...data, isLoggedIn, set }
}
