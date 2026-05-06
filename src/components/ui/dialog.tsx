import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogOverlayProps {
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

// Dialog Context
const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const useDialog = () => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within Dialog")
  }
  return context
}

// Main Dialog Component
const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

// Dialog Trigger Button
const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => {
  const { onOpenChange } = useDialog()
  return (
    <Button ref={ref} onClick={() => onOpenChange(true)} {...props}>
      {children}
    </Button>
  )
})
DialogTrigger.displayName = "DialogTrigger"

// Dialog Portal
const DialogPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null
  return React.createElement("div", { id: "dialog-portal" }, children)
}

// Dialog Overlay - Fixed version
const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className }, ref) => {
    const { open, onOpenChange } = useDialog()
    
    if (!open) return null
    
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className
        )}
        onClick={() => onOpenChange(false)}
      />
    )
  }
)
DialogOverlay.displayName = "DialogOverlay"

// Dialog Content - Fixed version
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useDialog()
    
    if (!open) return null
    
    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
            "bg-white rounded-lg shadow-lg duration-200 data-[state=open]:animate-in",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
            "data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2",
            "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2",
            "data-[state=open]:slide-in-from-top-[48%]",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

// Dialog Header
const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-6 pb-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}
DialogHeader.displayName = "DialogHeader"

// Dialog Title
const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  )
})
DialogTitle.displayName = "DialogTitle"

// Dialog Description
const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-zinc-500", className)}
      {...props}
    >
      {children}
    </p>
  )
})
DialogDescription.displayName = "DialogDescription"

// Dialog Footer
const DialogFooter = ({ className, children, ...props }: DialogFooterProps) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
DialogFooter.displayName = "DialogFooter"

// Dialog Close
const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ children, ...props }, ref) => {
  const { onOpenChange } = useDialog()
  return (
    <Button ref={ref} variant="ghost" onClick={() => onOpenChange(false)} {...props}>
      {children || "Close"}
    </Button>
  )
})
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}