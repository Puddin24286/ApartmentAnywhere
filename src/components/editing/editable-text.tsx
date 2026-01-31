"use client";

import { useState, useCallback } from "react";
import { Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  content: string;
  onSave: (newContent: string) => Promise<boolean> | boolean;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  editMode?: boolean;
  showEditButton?: boolean;
}

/**
 * Inline Editable Text Component
 *
 * Double-click to edit, Enter to save, Esc to cancel
 * Perfect for non-coders to make simple text edits
 */
export function EditableText({
  content,
  onSave,
  className,
  placeholder = "Enter text...",
  maxLength = 500,
  multiline = false,
  editMode: controlledEditMode,
  showEditButton = true
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Update local value when content prop changes
  if (content !== value && !isEditing) {
    setValue(content);
  }

  const handleStartEdit = () => {
    setIsEditing(true);
    setValue(content);
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    const trimmed = value.trim();
    if (!trimmed) {
      setSaveStatus('error');
      setIsSaving(false);
      return;
    }

    const success = await onSave(trimmed);

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
    setValue(content);
    setIsEditing(false);
    setSaveStatus('idle');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // If external edit mode control
  const isCurrentlyEditing = controlledEditMode !== undefined ? controlledEditMode : isEditing;

  if (isCurrentlyEditing) {
    return (
      <div className={cn("flex items-start gap-2", className)}>
        <div className="flex-1 relative">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={maxLength}
              placeholder={placeholder}
              rows={3}
              className={cn(
                "w-full px-3 py-2 border border-primary bg-background rounded-md",
                "focus:outline-none focus:ring-2 focus:ring-primary",
                saveStatus === 'error' && "border-destructive",
                saveStatus === 'success' && "border-green-500"
              )}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={maxLength}
              placeholder={placeholder}
              className={cn(
                "w-full px-3 py-2 border border-primary bg-background rounded-md",
                "focus:outline-none focus:ring-2 focus:ring-primary",
                saveStatus === 'error' && "border-destructive",
                saveStatus === 'success' && "border-green-500"
              )}
              autoFocus
            />
          )}

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
            disabled={isSaving || !value.trim()}
            className="h-8 px-3"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          {!multiline && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="h-8 px-3"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {multiline ? 'Shift+Enter for new line, Enter to save' : 'Enter to save, Esc to cancel'}
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
          "select-none"
        )}
      >
        {value || <span className="text-muted-foreground italic">{placeholder}</span>}
      </span>

      {showEditButton && (
        <button
          onClick={handleStartEdit}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
          aria-label="Edit"
        >
          <Edit2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  );
}

/**
 * Simplified editable text for quick use
 * Double-click to edit
 */
export function SimpleEditableText({
  content,
  onSave,
  maxLength = 100
}: {
  content: string;
  onSave: (newContent: string) => boolean;
  maxLength?: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  const handleSave = () => {
    if (value.trim() && onSave(value.trim())) {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setValue(content);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        className="px-2 py-1 border border-primary bg-background rounded focus:outline-none focus:ring-2 focus:ring-primary"
        autoFocus
      />
    );
  }

  return (
    <span
      onDoubleClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 select-none"
      title="Double-click to edit"
    >
      {content}
    </span>
  );
}
