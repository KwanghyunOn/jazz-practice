"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { exhaustiveCheck } from "@/lib/utils"

export default function Modal({
  children,
  placement = "center",
  className = "",
  onClose = null,
}: {
  children: React.ReactNode
  placement?: "bottom" | "center"
  className?: string
  onClose?: React.MouseEventHandler | null
}) {
  if (!onClose) {
    const router = useRouter()
    const clickedRef = useRef(false)
    onClose = () => {
      // disable onClick handler during exit animation
      if (!clickedRef.current) {
        clickedRef.current = true
        router.back()
      }
    }
  }

  let placementClass, dropIn
  switch (placement) {
    case "bottom":
      placementClass = "bottom-0 left-1/2 max-h-[80%]"
      dropIn = {
        initial: { x: "-50%", y: "100%" },
        animate: {
          y: "0",
          transition: { type: "spring", bounce: 0.3 },
        },
        exit: { x: "-50%", y: "100%" },
      }
      break
    case "center":
      placementClass = "top-1/2 left-1/2"
      dropIn = {
        initial: { x: "-50%", y: "-100%" },
        animate: {
          x: "-50%",
          y: "-50%",
          transition: { type: "spring", bounce: 0.3 },
        },
        exit: { x: "-50%", y: "-100%" },
      }
      break
    default:
      exhaustiveCheck(placement)
      throw new TypeError(`Unhandled placement type: ${placement}`)
  }
  return (
    <div>
      <motion.div
        className="fixed inset-0 backdrop-contrast-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          variants={dropIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`fixed overflow-auto ${placementClass} ${className}`}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
