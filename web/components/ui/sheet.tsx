"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => onOpenChange?.(false)} 
      />
      {/* Container */}
      <div className="relative z-50 h-full w-full max-w-md">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ onClose?: () => void }>, {
              onClose: () => onOpenChange?.(false),
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}

function SheetTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SheetClose({ onClick, children }: { onClick?: () => void; children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-4 right-4 p-1.5 rounded-full text-[#A8B89A] hover:text-[#F0EAD6] hover:bg-[#4F5E44]/50 transition-colors"
    >
      {children || <X className="w-5 h-5" />}
      <span className="sr-only">Close</span>
    </button>
  );
}

function SheetContent({
  className,
  children,
  onClose,
}: {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      className={cn(
        "relative z-50 h-full w-full bg-[#2E3B27] border-l border-[#4F5E44] p-6 text-[#F0EAD6] shadow-2xl overflow-y-auto flex flex-col justify-between",
        className
      )}
    >
      <SheetClose onClick={onClose} />
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1 pr-6 pb-4 border-b border-[#4F5E44]", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 pt-4 border-t border-[#4F5E44]", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-xl font-bold font-heading text-[#F0EAD6]", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-[#A8B89A]", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
