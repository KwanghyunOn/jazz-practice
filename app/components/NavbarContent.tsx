"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Signout from "./Signout"
import { Dropdown, DropdownContent, DropdownTrigger } from "./Dropdown"
import Modal from "./Modal"
import LoginForm from "./Login"
import { useUserContext } from "./UserContext"

export function NavbarContentProfile() {
  const { user } = useUserContext()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const logoutIcon = (
    <svg
      className="h-6 w-6 stroke-2 stroke-neutral-800 dark:stroke-neutral-100 fill-none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
  return (
    <div>
      {user ? (
        <div className="relative">
          <Dropdown>
            <DropdownTrigger>
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image
                  fill
                  src="https://lh3.googleusercontent.com/a/AAcHTtcm2qto2bNaDqZMXpXUIcTqoRp_gwEsiz0T85M_ax0fp90=s96-c"
                  // src={session.user?.image as string}
                  alt="Profile picture"
                  objectFit="cover"
                />
              </div>
            </DropdownTrigger>
            <DropdownContent>
              <div
                className="absolute right-0 mt-2 p-1 rounded-md overflow-hidden
            bg-neutral-50 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-200
          "
              >
                <Signout>
                  <div className="p-1 pl-2 gap-2 flex items-center">
                    <div className="whitespace-nowrap">Sign out</div>
                    {logoutIcon}
                  </div>
                </Signout>
              </div>
            </DropdownContent>
          </Dropdown>
        </div>
      ) : (
        <div>
          <button
            className="px-3 py-2 border border-solid text-sm rounded-md
          border-neutral-300 hover:bg-neutral-200 hover:border-neutral-200
          dark:border-neutral-600 dark:hover:bg-neutral-700 dark:hover:border-neutral-700
          "
            onClick={() => setIsLoginModalOpen(true)}
          >
            Log in
          </button>
          {isLoginModalOpen && (
            <Modal
              placement="center"
              onClose={() => setIsLoginModalOpen(false)}
            >
              <LoginForm
                onSuccess={() => {
                  setIsLoginModalOpen(false)
                }}
              />
            </Modal>
          )}
        </div>
      )}
    </div>
  )
}

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
