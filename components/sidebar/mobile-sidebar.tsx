import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { IconMenu } from "@tabler/icons-react"
import { FC, useState } from "react"
import { useMediaQuery } from "react-responsive"
import SimplifiedSidebar from "./simplified-sidebar"

const MobileSidebar: FC = () => {
  const [open, setOpen] = useState(false)
  
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  
  if (!isMobile) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
        >
          <IconMenu />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="p-0">
        <SimplifiedSidebar onNavItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar 