import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { useTheme } from "next-themes"
import Link from "next/link"
import { FC } from "react"

const Header: FC = () => {
  const { theme } = useTheme()

  return (
    <div className="border-b bg-background flex h-[60px] items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2">
        <ChatbotUISVG theme={theme === "dark" ? "dark" : "light"} scale={0.25} />
        <div className="ml-2 font-bold">Chatbot UI</div>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500">Demo Mode</div>
      </div>
    </div>
  )
}

export default Header 