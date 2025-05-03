import { ContentType } from "@/types"
import { FC } from "react"
import SimplifiedSidebar from "./simplified-sidebar"

interface SidebarProps {
  contentType: ContentType
  showSidebar: boolean
}

const Sidebar: FC<SidebarProps> = ({ contentType, showSidebar }) => {
  return (
    <div className="hidden h-full w-[250px] border-r md:block">
      <SimplifiedSidebar contentType={contentType} showSidebar={showSidebar} />
    </div>
  )
}

export default Sidebar
