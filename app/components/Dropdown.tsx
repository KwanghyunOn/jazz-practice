"use client"

import React from "react"
import { useState } from "react"
import Backdrop from "./Backdrop"

export function DropdownTrigger({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function DropdownContent({ children }: { children: React.ReactNode }) {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>
}

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [trigger, content] = React.Children.toArray(children)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div>
          <Backdrop onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 z-10">{content}</div>
        </div>
      )}
    </div>
  )
}
