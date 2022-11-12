import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "../utils/store"
import { useEffect } from "react"
import setDarkMode from "../utils/customHooks/useDarkMode"

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const darkMode = localStorage.getItem("dark_mode")
    if (darkMode !== null) setDarkMode(darkMode)
    else localStorage.setItem("dark_mode", "off")
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
