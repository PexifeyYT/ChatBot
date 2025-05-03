'use client'

import { useState, useEffect } from 'react'

interface UseAutoSendOptions {
  onSend: () => void
  isReady?: boolean
  delay?: number
}

export const useAutoSend = ({
  onSend,
  isReady = true,
  delay = 500
}: UseAutoSendOptions) => {
  const [shouldSend, setShouldSend] = useState(false)

  useEffect(() => {
    if (shouldSend && isReady) {
      const timer = setTimeout(() => {
        onSend()
        setShouldSend(false)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [shouldSend, isReady, onSend, delay])

  const triggerSend = () => {
    setShouldSend(true)
  }

  return {
    triggerSend
  }
} 