'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useChatNavigation = () => {
  const router = useRouter()
  
  const navigateToChat = useCallback((chatId: string) => {
    router.push(`/chat/${chatId}`)
  }, [router])
  
  const navigateToHome = useCallback(() => {
    router.push('/')
  }, [router])
  
  return {
    navigateToChat,
    navigateToHome
  }
} 