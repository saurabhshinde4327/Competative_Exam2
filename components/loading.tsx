import { Loader2 } from "lucide-react"

interface LoadingProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export function Loading({ message = "Loading...", size = "md" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      <span className="mt-2 text-sm text-gray-600">{message}</span>
    </div>
  )
} 