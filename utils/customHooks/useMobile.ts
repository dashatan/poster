import { useEffect, useState } from "react"

const useMobile = (initialState?: boolean) => {
  const [isMobile, setIsMobile] = useState(initialState)

  useEffect(() => setIsMobile(window.innerWidth < 640), [])

  useEffect(() => {
    window.addEventListener("resize", () => {
      const isSmallScreen = window.innerWidth < 640
      isSmallScreen !== isMobile && setIsMobile(isSmallScreen)
    })
  }, [isMobile])

  return isMobile
}

export default useMobile
