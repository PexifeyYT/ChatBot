import { ContentType } from "@/types"
import { mockHomeWorkspace } from "@/lib/mock-data/store"
import { IconHome, IconMessage, IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { FC } from "react"

interface SimplifiedSidebarProps {
  onNavItemClick?: () => void
  contentType?: ContentType
  showSidebar?: boolean
}

const SimplifiedSidebar: FC<SimplifiedSidebarProps> = ({ 
  onNavItemClick = () => {},
  contentType,
  showSidebar
}) => {
  const router = useRouter()

  const handleNewChat = async () => {
    router.push(`/${mockHomeWorkspace.id}/chat`)
    onNavItemClick()
  }

  return (
    <div className="flex h-full flex-col p-2">
      <div className="mb-2 flex items-center justify-center py-2 text-xl font-bold">
        Chatbot UI
      </div>

      <div className="space-y-2">
        <div
          className="flex cursor-pointer items-center rounded-md p-2 hover:bg-accent"
          onClick={handleNewChat}
        >
          <IconHome className="mr-2" size={20} />
          <div>Home</div>
        </div>

        <div
          className="flex cursor-pointer items-center rounded-md p-2 hover:bg-accent"
          onClick={handleNewChat}
        >
          <IconMessage className="mr-2" size={20} />
          <div>Chats</div>
        </div>

        <div
          className="flex cursor-pointer items-center rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
          onClick={handleNewChat}
        >
          <IconPlus className="mr-2" size={20} />
          <div>New Chat</div>
        </div>
      </div>
    </div>
  )
}

export default SimplifiedSidebar 