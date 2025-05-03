'use client'

import { ChatbotUIContext } from "@/context/context"
import { updateProfile } from "@/db/profile"
import { useContext, useState } from "react"
import { toast } from "sonner"

export const useProfileSettings = () => {
  const { profile, setProfile } = useContext(ChatbotUIContext)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateSettings = async (settings: Partial<typeof profile>) => {
    if (!profile) return

    setIsUpdating(true)

    try {
      const updatedProfile = await updateProfile(
        profile.id,
        {
          ...profile,
          ...settings
        }
      )

      if (updatedProfile) {
        setProfile(updatedProfile)
        toast.success("Settings updated")
      }
    } catch (error) {
      console.error("Error updating profile settings:", error)
      toast.error("Failed to update settings")
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    profile,
    isUpdating,
    updateSettings
  }
} 