import { createMessage as mockCreateMessage, getMessagesByChatId as mockGetMessagesByChatId } from "@/lib/mock-data/store"
import { TablesInsert, Tables } from "@/supabase/types"

export const getMessageById = async (messageId: string) => {
  // Search through all messages to find one with the matching ID
  const allChats = await mockGetMessagesByChatId("")  // Empty string will return all messages
  return allChats.find(message => message.id === messageId) || null
}

export const getMessagesByChatId = async (chatId: string) => {
  return mockGetMessagesByChatId(chatId)
}

export const createMessage = async (message: TablesInsert<"messages">) => {
  return mockCreateMessage(message)
}

export const createMessages = async (messages: TablesInsert<"messages">[]) => {
  // Mock implementation
  const createdMessages = []
  
  for (const message of messages) {
    const createdMessage = await mockCreateMessage(message)
    createdMessages.push(createdMessage)
  }
  
  return createdMessages
}

export const updateMessage = async (
  messageId: string,
  updates: Partial<Tables<"messages">> | string
) => {
  // This is just a stub - you would modify the message in the mock data store
  if (typeof updates === 'string') {
    // Handle the old way for backwards compatibility
    return {
      id: messageId,
      content: updates
    }
  } else {
    // Handle the new way with a message object
    return {
      id: messageId,
      ...updates
    }
  }
}

export const deleteMessages = async (chatId: string) => {
  // This is just a stub - you would delete the messages from the mock data store
  return true
}

export const getLatestMessage = async (chatId: string) => {
  const messages = await mockGetMessagesByChatId(chatId)
  if (messages.length === 0) return null
  
  // Find message with highest sequence number
  return messages.reduce((latest, message) => {
    return message.sequence_number > latest.sequence_number ? message : latest
  }, messages[0])
}

export const getFirstUserMessage = async (chatId: string) => {
  const messages = await mockGetMessagesByChatId(chatId)
  return messages.find(message => message.role === "user") || null
}

export const getMessagesBySequenceNumbers = async (
  chatId: string,
  sequenceNumbers: number[]
) => {
  const messages = await mockGetMessagesByChatId(chatId)
  return messages.filter(message => sequenceNumbers.includes(message.sequence_number))
}

export async function deleteMessagesIncludingAndAfter(
  chatId: string,
  sequenceNumber: number
) {
  // Mock implementation - you would filter out messages with sequence numbers >= the provided one
  return true
}

export async function createDuplicateMessagesForChat(
  oldChatId: string,
  newChatId: string
) {
  // Mock implementation - you would clone messages from one chat to another
  const messages = await mockGetMessagesByChatId(oldChatId)
  
  // Create copies of each message with the new chat ID
  const newMessages = []
  
  for (const message of messages) {
    const newMessage = await mockCreateMessage({
      ...message,
      id: undefined,
      chat_id: newChatId
    })
    newMessages.push(newMessage)
  }
  
  return newMessages
}
