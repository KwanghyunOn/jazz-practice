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
  const profileIcon = (
    <svg
      className="h-6 w-6 stroke-2 stroke-neutral-800 dark:stroke-neutral-100 fill-none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
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
              <div className="mr-1">{profileIcon}</div>
            </DropdownTrigger>
            <DropdownContent>
              <div
                className="absolute right-0 mt-2 rounded-md overflow-hidden flex flex-col
            bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-200
          "
              >
                <div className="p-2 border-b-2 border-neutral-700 dark:border-neutral-500">
                  {user.username}
                </div>
                <Signout>
                  <div className="p-2 flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-600">
                    <div className="whitespace-nowrap">Sign out</div>
                    <div className="ml-2">{logoutIcon}</div>
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
