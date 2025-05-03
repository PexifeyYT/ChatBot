'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const useChatId = () => {
  const params = useParams<{ chatId: string }>()
  const searchParams = useSearchParams()
  const chatIdParam = searchParams.get('chatId')
  
  const chatId = useMemo(() => {
    return params?.chatId || chatIdParam || ''
  }, [params?.chatId, chatIdParam])

  return chatId
} 