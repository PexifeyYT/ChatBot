import { getWorkspacesByUserId as mockGetWorkspacesByUserId, mockHomeWorkspace } from "@/lib/mock-data/store"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getWorkspaceById = async (workspaceId: string) => {
  // If the ID matches the mock workspace, return it
  if (workspaceId === mockHomeWorkspace.id) {
    return mockHomeWorkspace
  }
  
  // Otherwise return null
  return null
}

export const getWorkspacesByUserId = async (userId: string) => {
  return mockGetWorkspacesByUserId(userId)
}

export const createWorkspace = async (workspace: TablesInsert<"workspaces">) => {
  // Just return a modified home workspace as if it was created
  return {
    ...mockHomeWorkspace,
    id: "new-" + Date.now(),
    name: workspace.name || "New Workspace",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_home: false
  }
}

export const updateWorkspace = async (
  workspaceId: string,
  workspace: TablesUpdate<"workspaces">
) => {
  // Return a modified workspace
  return {
    ...mockHomeWorkspace,
    ...workspace,
    id: workspaceId,
    updated_at: new Date().toISOString()
  }
}

export const deleteWorkspace = async (workspaceId: string) => {
  // Mock delete
  return true
}
