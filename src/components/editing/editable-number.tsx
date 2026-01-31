"use client";

import { useState, useCallback } from "react";
import { Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditableNumberProps {
  value: number;
  onSave: (newValue: number) => Promise<boolean> | boolean;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  editMode?: boolean;
  decimals?: number;
  placeholder?: string;
}

/**
 * Inline Editable Number Component
 *
 * Double-click to edit, Enter to save, Esc to cancel
 * Perfect for editing prices, dimensions, etc.
 */
export function EditableNumber({
  value,
  onSave,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  className,
  editMode: controlledEditMode,
  decimals = 0,
  placeholder = "0"
}: EditableNumberProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Update local value when value prop changes
  if (value !== parseFloat(inputValue) && !isEditing) {
    setInputValue(value.toString());
  }

  const handleStartEdit = () => {
    setIsEditing(true);
    setInputValue(value.toString());
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setSaveStatus('error');
      setIsSaving(false);
      return;
    }

    const success = await onSave(numValue);

    if (success) {
      setSaveStatus('success');
      setIsEditing(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
    } else {
      setSaveStatus('error');
    }

    setIsSaving(false);
  };

  const handleCancel = () => {
    setInputValue(value.toString());
    setIsEditing(false);
    setSaveStatus('idle');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // Format for display
  const displayValue = isEditing ? inputValue : (
    decimals > 0
      ? (parseFloat(value.toString()).toFixed(decimals))
      : value.toLocaleString()
  );

  // If external edit mode control
  const isCurrentlyEditing = controlledEditMode !== undefined ? controlledEditMode : isEditing;

  if (isCurrentlyEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex items-center flex-1 relative">
          {prefix && <span className="text-muted-foreground">{prefix}</span>}
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            className={cn(
              "w-full px-3 py-2 border border-primary bg-background rounded-md",
              "focus:outline-none focus:ring-2 focus:ring-primary",
              saveStatus === 'error' && "border-destructive",
              saveStatus === 'success' && "border-green-500",
              "flex-1"
            )}
            autoFocus
          />
          {suffix && <span className="text-muted-foreground">{suffix}</span>}

          {saveStatus === 'success' && (
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
          )}
          {saveStatus === 'error' && (
            <X className="h-4 w-4 text-destructive flex-shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !inputValue}
            className="h-8 px-3"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 px-3"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group inline-flex items-center gap-1", className)}>
      <span
        onDoubleClick={handleStartEdit}
        className={cn(
          "cursor-text",
          "hover:bg-muted/50 rounded px-1 py-0.5 transition-colors",
          "select-none font-mono"
        )}
      >
        {prefix && <span className="text-muted-foreground">{prefix}</span>}
        <span className={value === 0 && !isEditing ? "text-muted-foreground italic" : ""}>
          {displayValue}
        </span>
        {suffix && <span className="text-muted-foreground">{suffix}</span>}
      </span>

      <button
        onClick={handleStartEdit}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
        aria-label="Edit"
      >
        <Edit2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>
    </div>
  );
}

/**
 * Quick editable price with currency formatting
 */
export function EditablePrice({
  value,
  onSave,
  min = 0
}: {
  value: number;
  onSave: (newValue: number) => boolean;
  min?: number;
}) {
  return (
    <EditableNumber
      value={value}
      onSave={onSave}
      min={min}
      prefix="$"
      suffix="/mo"
      decimals={0}
    />
  );
}
