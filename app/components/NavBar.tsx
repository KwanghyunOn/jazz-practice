import Link from "next/link"
import React from "react"

export function NavbarContentMenu({
  href,
  className = "",
}: {
  href: string
  className?: string
}) {
  const menuIcon = (
    <svg
      className="h-6 w-6 stroke-2 stroke-neutral-800 dark:stroke-neutral-100 fill-none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5h18M3 12h18M3 19h18"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
  return (
    <Link href={href} className={`ml-1 ${className}`}>
      {menuIcon}
    </Link>
  )
}

export function NavbarContentBack({
  href,
  className = "",
}: {
  href: string
  className?: string
}) {
  const chevronLeftIcon = (
    <svg
      className="h-8 w-8 stroke-2 stroke-neutral-800 dark:stroke-neutral-100 fill-none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 6l-6 6 6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
  return (
    <Link href={href} className={`${className}`}>
      {chevronLeftIcon}
    </Link>
  )
}

export function Navbar({
  title,
  contentLeft = null,
  contentRight = null,
}: {
  title: string
  contentLeft?: React.ReactNode | null
  contentRight?: React.ReactNode | null
}) {
  return (
    <div className="sticky w-full py-4 px-2 grid grid-cols-6 items-center bg-neutral-100 dark:bg-neutral-800">
      {contentLeft}
      <h1 className="col-start-2 col-end-6 font-semibold text-xl text-center">
        {title}
      </h1>
      {contentRight}
    </div>
  )
}
