import { getProfileByUserId as mockGetProfileByUserId, mockProfile } from "@/lib/mock-data/store"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getProfileByUserId = async (userId: string) => {
  return mockGetProfileByUserId(userId)
}

export const getProfilesByUserId = async (userId: string) => {
  // Just return an array with the mock profile
  return [mockProfile]
}

export const createProfile = async (profile: TablesInsert<"profiles">) => {
  // Just return the mock profile instead of creating a new one
  return mockProfile
}

export const updateProfile = async (
  profileId: string,
  profile: TablesUpdate<"profiles">
) => {
  // Return a merged profile as if it was updated
  return {
    ...mockProfile,
    ...profile,
    updated_at: new Date().toISOString()
  }
}

export const deleteProfile = async (profileId: string) => {
  // Pretend to delete a profile
  return true
}
