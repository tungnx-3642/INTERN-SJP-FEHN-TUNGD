"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Toggle } from "@/components/ui/toggle"

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])

  const onPressedChange = (nextPressed: boolean) => {
    setIsDark(nextPressed)
    setTheme(nextPressed ? "dark" : "light")
  }

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={onPressedChange}
      aria-label="Toggle dark mode"
      className="relative w-10 h-10 p-0 rounded-full flex items-center justify-center transition-colors"
    >
      <Sun className={`h-7 w-7 transition-opacity ${isDark ? "opacity-0" : "opacity-100 text-yellow-500"}`} />
      <Moon className={`absolute h-7 w-7 transition-opacity ${isDark ? "opacity-100 text-blue-400" : "opacity-0"}`} />
    </Toggle>
  )
}
