import { FC } from "react"
import SimplifiedSidebar from "./simplified-sidebar"

const Sidebar: FC = () => {
  return (
    <div className="hidden h-full w-[250px] border-r md:block">
      <SimplifiedSidebar />
    </div>
  )
}

export default Sidebar
