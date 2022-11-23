import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "../utils/store"
import { useEffect, useState } from "react"
import setDarkMode from "../utils/customHooks/useDarkMode"
import LocalStorageContext from "../utils/contexts/LocalStorageContext"

function MyApp({ Component, pageProps }: AppProps) {
  const [ls, setLs] = useState({})

  useEffect(() => {
    //dark mode
    const darkMode = localStorage.getItem("dark_mode")
    if (darkMode !== null) setDarkMode(darkMode)
    else localStorage.setItem("dark_mode", "off")

    // userToken through context
    const userToken = window.localStorage.getItem("userToken")
    const isLoggedIn = userToken ? true : false
    setLs((ls) => ({ ...ls, userToken, isLoggedIn }))
  }, [])
  return (
    <Provider store={store}>
      <LocalStorageContext.Provider value={ls}>
        <Component {...pageProps} />
      </LocalStorageContext.Provider>
    </Provider>
  )
}

export default MyApp
