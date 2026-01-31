"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles with form theme variables
          "flex min-h-[60px] w-full rounded-md border border-form-border bg-form px-3 py-2 text-sm shadow-sm placeholder:text-form-placeholder",
          // Smooth transitions
          "transition-all duration-200 ease-out",
          // Focus state
          "focus:bg-form-focus focus:border-form-border-focus focus:outline-none",
          "focus:ring-1 focus:ring-form-ring",
          "focus:shadow-[0_0_0_3px_hsl(var(--form-focus-shadow))]",
          // Disabled state
          "disabled:cursor-not-allowed disabled:bg-form-disabled disabled:text-form-text-disabled disabled:opacity-60",
          // Error state
          hasError && "border-form-border-error focus:border-form-border-error",
          // Resize
          "resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
