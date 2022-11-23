import { createContext } from "react"

const initialLs: LsType = {
  isLoggedIn: undefined,
  userToken: undefined,
}

interface LsType {
  isLoggedIn?: boolean
  userToken?: string | null
}

const LocalStorageContext = createContext(initialLs)

export default LocalStorageContext
