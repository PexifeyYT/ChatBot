import { cookies } from "next/headers"

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  // Return a mock client
  return {
    auth: {
      getSession: async () => ({
        data: {
          session: null
        },
        error: null
      })
    }
  }
}
