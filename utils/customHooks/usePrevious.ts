import { useEffect, useRef } from "react"

export default function usePrevious(value: string | number) {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
