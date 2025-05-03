import { Tables } from "@/supabase/types";
import { v4 as uuidv4 } from "uuid";

// Mock user profile
export const mockProfile: Tables<"profiles"> = {
  id: "mock-profile-id",
  user_id: "mock-user-id",
  display_name: "Demo User",
  has_onboarded: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  anthropic_api_key: null,
  openai_api_key: null,
  azure_openai_api_key: null,
  mistral_api_key: null,
  google_gemini_api_key: null,
  groq_api_key: null,
  perplexity_api_key: null,
  openai_organization_id: null,
  azure_openai_endpoint: null,
  openrouter_api_key: null,
  bio: "",
  image_path: "",
  image_url: "",
  profile_context: "",
  use_azure_openai: false,
  username: "demo",
  azure_openai_35_turbo_id: null,
  azure_openai_45_turbo_id: null,
  azure_openai_45_vision_id: null,
  azure_openai_embeddings_id: null
};

// Mock home workspace
export const mockHomeWorkspace: Tables<"workspaces"> = {
  id: "mock-workspace-id",
  user_id: "mock-user-id",
  name: "Home",
  description: "",
  is_home: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  instructions: "This is your home workspace.",
  image_path: "",
  default_context_length: 4000,
  default_model: "gpt-4-turbo-preview",
  default_prompt: "You are a helpful assistant.",
  default_temperature: 0.5,
  embeddings_provider: "openai",
  include_profile_context: false,
  include_workspace_instructions: true,
  sharing: "private"
};

// Mock data stores
export const mockDataStore: {
  workspaces: Tables<"workspaces">[];
  chats: Tables<"chats">[];
  messages: Tables<"messages">[];
  assistants: Tables<"assistants">[];
  files: Tables<"files">[];
  prompts: Tables<"prompts">[];
  presets: Tables<"presets">[];
  tools: Tables<"tools">[];
  collections: Tables<"collections">[];
  folders: Tables<"folders">[];
  models: Tables<"models">[];
  file_items: Tables<"file_items">[];
} = {
  workspaces: [mockHomeWorkspace],
  chats: [],
  messages: [],
  assistants: [],
  files: [],
  prompts: [],
  presets: [],
  tools: [],
  collections: [],
  folders: [],
  models: [],
  file_items: []
};

// Helper functions to replace Supabase queries
export const getProfileByUserId = async (userId: string) => {
  return mockProfile;
};

export const getWorkspacesByUserId = async (userId: string) => {
  return mockDataStore.workspaces;
};

export const getChatsByWorkspaceId = async (workspaceId: string) => {
  return mockDataStore.chats.filter(chat => chat.workspace_id === workspaceId);
};

export const getChatById = async (chatId: string) => {
  return mockDataStore.chats.find(chat => chat.id === chatId) || null;
};

export const createChat = async (chat: Partial<Tables<"chats">>) => {
  const newChat: Tables<"chats"> = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: mockProfile.user_id,
    workspace_id: chat.workspace_id || mockHomeWorkspace.id,
    name: chat.name || "New Chat",
    model: chat.model || "gpt-4-turbo-preview",
    prompt: chat.prompt || "You are a helpful AI assistant.",
    temperature: chat.temperature || 0.5,
    context_length: chat.context_length || 4000,
    include_profile_context: chat.include_profile_context || false,
    include_workspace_instructions: chat.include_workspace_instructions || false,
    embeddings_provider: chat.embeddings_provider || "openai",
    assistant_id: chat.assistant_id || null,
    folder_id: chat.folder_id || null,
    sharing: chat.sharing || "private"
  };
  
  mockDataStore.chats.push(newChat);
  return newChat;
};

export const deleteChat = async (chatId: string) => {
  mockDataStore.chats = mockDataStore.chats.filter(chat => chat.id !== chatId);
  return true;
};

export const getMessagesByChatId = async (chatId: string) => {
  // Return all messages if chatId is empty, otherwise filter by chatId
  if (!chatId) {
    return mockDataStore.messages;
  }
  return mockDataStore.messages.filter(message => message.chat_id === chatId);
};

export const createMessage = async (message: Partial<Tables<"messages">>) => {
  const newMessage: Tables<"messages"> = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    updated_at: null,
    user_id: mockProfile.user_id,
    chat_id: message.chat_id || "",
    content: message.content || "",
    role: message.role || "user",
    sequence_number: message.sequence_number || 0,
    image_paths: message.image_paths || [],
    model: message.model || "gpt-4-turbo-preview",
    assistant_id: message.assistant_id || null
  };
  
  mockDataStore.messages.push(newMessage);
  return newMessage;
};

// Creating a mock file item type with the required fields for our implementation
export interface MockFileItem {
  id: string;
  file_id: string;
  chat_id?: string; // Added for our implementation
  message_id?: string; // Added for our implementation
}

// Get chat files by chat ID
export const getChatFilesByChatId = async (chatId: string) => {
  // This function returns a custom structure with the files
  const fileIds = mockDataStore.file_items
    .filter(fi => (fi as unknown as MockFileItem).chat_id === chatId)
    .map(fi => fi.file_id);
  
  return {
    files: mockDataStore.files.filter(file => fileIds.includes(file.id))
  };
};

// Get message file items by message ID
export const getMessageFileItemsByMessageId = async (messageId: string) => {
  // This function returns a custom structure with the file items
  const fileItems = mockDataStore.file_items
    .filter(fi => (fi as unknown as MockFileItem).message_id === messageId);
  
  return {
    id: messageId,
    file_items: fileItems
  };
};

// Add other mock functions as needed 