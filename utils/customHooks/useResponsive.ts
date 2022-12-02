import { useEffect, useState } from "react"

export default function useResponsive(deviceSize?: boolean) {
  const [screen, setScreen] = useState<string>()

  const screenSize = (w: number): string | undefined => {
    const screenSizes: { [key: string]: boolean } = {
      sm: w < 640,
      md: w > 640 && w < 1000,
      lg: w > 1000,
    }
    const screenSize = Object.keys(screenSizes).find((x) => !!screenSizes[x])
    return screenSize
  }

  useEffect(() => {
    setScreen(screenSize(window.innerWidth))
  }, [])

  useEffect(() => {
    window.addEventListener("resize", () => {
      const sc = screenSize(window.innerWidth)
      sc !== screen && setScreen(sc)
    })
  }, [screen])

  return {
    screen,
    isLoading: screen === undefined,
    isMobile: screen === "sm",
    isTablet: screen === "md",
    isDesktop: screen === "lg",
  }
}
