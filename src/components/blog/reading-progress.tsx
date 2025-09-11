"use client"
import { Progress } from "@/components/ui/progress"
import { useBlogProgress } from "@/contexts/reading-progress"
import { useCallback, useEffect, useState } from "react"

export default function HeaderProgressBar() {
  const [progress, setProgress] = useState(0)
  const {contentRef} = useBlogProgress()

  const updateProgress = useCallback(() => {
    const el = contentRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight

    const scrollTop = Math.max(0, windowHeight - rect.top)
    const scrollHeight = el.scrollHeight

    const progressValue = Math.min(100, (scrollTop / scrollHeight) * 100)
    setProgress(progressValue)
  }, [contentRef])

  useEffect(() => {
    // Target the section manually or dynamically
    if (!contentRef.current) return

    window.addEventListener("scroll", updateProgress)
    window.addEventListener("resize", updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [updateProgress,contentRef])

  return (
    <div className="absolute z-10 bottom-0 left-0 w-full">
      <Progress className="rounded-none h-[5px]" value={progress} />
    </div>
  )
}
