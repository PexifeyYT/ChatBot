import { Database } from "@/supabase/types"
import { User, createClient } from "@supabase/supabase-js"

// Create a mock client with dummy values
// This prevents errors when trying to use Supabase functionalities
export const supabase = createClient<Database>(
  "https://mock-supabase-url.supabase.co",
  "mock-supabase-anon-key",
  {
    auth: {
      // Return mock data for auth functions
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
)

// Mock the auth methods to return dummy sessions and users
const originalGetSession = supabase.auth.getSession
supabase.auth.getSession = async () => {
  return {
    data: {
      session: null
    },
    error: null
  }
}

// Override auth methods with type-compatible mocks
const originalGetUser = supabase.auth.getUser
// We need to cast these to avoid TypeScript errors
supabase.auth.getUser = async () => ({
  data: { 
    user: null as unknown as User
  },
  error: null
})
