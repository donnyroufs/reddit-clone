import { useEffect, useRef } from "react"

export function usePortal(selector: string) {
  const rootElemRef = useRef(document.createElement("div"))

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(`#${selector}`)

    if (!root) throw new Error("Failed to find portal root")

    root.appendChild(rootElemRef.current)

    return () => rootElemRef.current.remove()
  }, [selector])

  return rootElemRef.current
}
