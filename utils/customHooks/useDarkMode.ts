import { useEffect, useState } from "react"

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState("off")
  useEffect(() => {
    let dm = window.localStorage.getItem("dark_mode")
    if (!dm) {
      window.localStorage.setItem("dark_mode", "off")
      dm = "off"
    }
    setDarkMode(dm)
  }, [])

  useEffect(() => {
    const classList = document.documentElement.classList
    if (darkMode === "on") classList.add("dark")
    if (darkMode === "off") classList.remove("dark")
    window.localStorage.setItem("dark_mode", darkMode)
  }, [darkMode])

  function toggle() {
    setDarkMode((dm) => (dm === "on" ? "off" : "on"))
  }

  return { toggle }
}
