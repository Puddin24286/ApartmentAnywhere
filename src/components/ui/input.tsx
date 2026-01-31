import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles with form theme variables
          "flex h-9 w-full rounded-md px-3 py-1 text-sm shadow-sm",
          "bg-form border border-form-border text-form-text",
          // Smooth transitions (200ms for that snappy feel)
          "transition-all duration-200 ease-out",
          // File input specific styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // Placeholder styling
          "placeholder:text-form-placeholder",
          // Hover state - subtle border enhancement
          "hover:border-form-border-hover hover:bg-form-hover",
          // Focus state - the magic happens here
          "focus:bg-form-focus focus:border-form-border-focus focus:outline-none",
          "focus:ring-1 focus:ring-form-ring",
          "focus:shadow-[0_0_0_3px_hsl(var(--form-focus-shadow))]",
          // Disabled state
          "disabled:cursor-not-allowed disabled:bg-form-disabled disabled:text-form-text-disabled disabled:opacity-60",
          // Error state
          hasError && "border-form-border-error focus:border-form-border-error focus:ring-form-border-error",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
