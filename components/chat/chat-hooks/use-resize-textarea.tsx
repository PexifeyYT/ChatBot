'use client'

import { useEffect, useRef } from 'react'

export const useResizeTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const handleInput = () => {
      resizeTextarea()
    }

    textarea.addEventListener('input', handleInput)
    
    // Initial resize
    resizeTextarea()

    return () => {
      textarea.removeEventListener('input', handleInput)
    }
  }, [])

  return {
    textareaRef,
    resizeTextarea
  }
} 