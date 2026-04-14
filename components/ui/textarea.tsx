import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-iris focus-visible:ring-iris/30 focus-visible:ring-[3px] focus-visible:shadow-lg focus-visible:shadow-iris/20",
        "hover:border-iris/50 hover:shadow-sm hover:shadow-iris/10",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
