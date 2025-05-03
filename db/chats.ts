import { 
  createChat as mockCreateChat, 
  deleteChat as mockDeleteChat, 
  getChatById as mockGetChatById,
  getChatsByWorkspaceId as mockGetChatsByWorkspaceId
} from "@/lib/mock-data/store"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getChatById = async (chatId: string) => {
  return mockGetChatById(chatId)
}

export const getChatsByWorkspaceId = async (workspaceId: string) => {
  return mockGetChatsByWorkspaceId(workspaceId)
}

export const createChat = async (chat: TablesInsert<"chats">) => {
  return mockCreateChat(chat)
}

export const createChats = async (chats: TablesInsert<"chats">[]) => {
  const createdChats = []
  
  for (const chat of chats) {
    const createdChat = await mockCreateChat(chat)
    createdChats.push(createdChat)
  }
  
  return createdChats
}

export const updateChat = async (
  chatId: string,
  chat: TablesUpdate<"chats">
) => {
  // Mock implementation
  const existingChat = await mockGetChatById(chatId)
  
  if (!existingChat) {
    throw new Error("Chat not found")
  }
  
  const updatedChat = {
    ...existingChat,
    ...chat,
    updated_at: new Date().toISOString()
  }
  
  // This is a simple implementation - a real one would update the mock data store
  return updatedChat
}

export const deleteChat = async (chatId: string) => {
  return mockDeleteChat(chatId)
}
