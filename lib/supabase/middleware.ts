import { Database } from "@/supabase/types"
import { NextRequest, NextResponse } from "next/server"

// This is a mock implementation for the middleware
export function createClient(req: NextRequest) {
  const mockClient = {
    auth: {
      getSession: async () => ({
        data: {
          session: null
        },
        error: null
      })
    }
  }

  return {
    supabase: mockClient,
    response: NextResponse.next()
  }
}
