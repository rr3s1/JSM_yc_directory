"use client"

import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

function toast(props: ToastProps) {
  const { title, description, variant } = props

  if (variant === "destructive") {
    sonnerToast.error(title || "Error", {
      description: description,
    })
  } else {
    sonnerToast.success(title || "Success", {
      description: description,
    })
  }

  return {
    id: Math.random().toString(),
    dismiss: () => {},
    update: () => {},
  }
}

function useToast() {
  return {
    toast,
    dismiss: () => {},
  }
}

export { useToast, toast }
