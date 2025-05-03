import { Database } from "@/supabase/types"
import { cookies } from "next/headers"

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  // Return mock client with minimal implementation
  return {
    auth: {
      getSession: async () => ({
        data: {
          session: null
        },
        error: null
      }),
      getUser: async () => ({
        data: {
          user: null
        },
        error: null
      }),
      signInWithPassword: async () => ({
        data: null,
        error: { message: "Authentication is disabled in this version" }
      }),
      signOut: async () => ({
        error: null
      })
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          select: () => ({
            single: async () => ({
              data: null,
              error: null
            }),
            maybeSingle: async () => ({
              data: null,
              error: null
            })
          }),
          order: () => ({
            data: [],
            error: null
          })
        })
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({
            data: null,
            error: null
          })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: async () => ({
              data: null,
              error: null
            })
          })
        })
      }),
      delete: () => ({
        eq: () => ({
          error: null
        })
      })
    })
  }
}
