"use client"

import Header from "@/components/sidebar/header"
import MobileSidebar from "@/components/sidebar/mobile-sidebar"
import Sidebar from "@/components/sidebar/sidebar"
import { ChatbotUIContext } from "@/context/context"
import { getWorkspaceById } from "@/db/workspaces"
import { mockHomeWorkspace } from "@/lib/mock-data/store"
import { redirect } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function WorkspaceLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: {
    workspaceid: string
  }
}) {
  const { workspaces, selectedWorkspace, setSelectedWorkspace } =
    useContext(ChatbotUIContext)

  const [loading, setLoading] = useState(true)

  // If the URL has a workspace ID, we need to set it as the selected workspace
  useEffect(() => {
    const setWorkspace = async () => {
      // Use the mockHomeWorkspace if the workspaceid is the mock ID
      if (params.workspaceid === mockHomeWorkspace.id) {
        setSelectedWorkspace(mockHomeWorkspace)
        setLoading(false)
        return
      }

      // Otherwise try to find it in the workspace list
      const workspace = workspaces.find(w => w.id === params.workspaceid)

      if (workspace) {
        setSelectedWorkspace(workspace)
        setLoading(false)
        return
      }

      // If we can't find the workspace, redirect to the home workspace
      redirect(`/${mockHomeWorkspace.id}/chat`)
    }

    setWorkspace()
  }, [params.workspaceid, workspaces, setSelectedWorkspace])

  if (loading) {
    return null
  }

  return (
    <>
      <Header />

      <div className="flex h-[calc(100%-65px)]">
        <Sidebar contentType="chats" showSidebar={true} />

        <div className="w-full overflow-auto pb-36 2xl:px-32">
          <div className="mx-auto w-full max-w-screen-lg">{children}</div>
        </div>

        <MobileSidebar />
      </div>
    </>
  )
}
