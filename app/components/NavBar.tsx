import Link from "next/link"

export default function NavBar({
  title,
  hrefBack,
}: {
  title: string
  hrefBack: string
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
    <div className="sticky w-full py-4 grid grid-cols-6 items-center bg-neutral-100 dark:bg-neutral-800">
      <Link href={hrefBack} className="ml-1">
        {chevronLeftIcon}
      </Link>
      <h1 className="col-start-2 col-end-6 font-semibold text-xl text-center">
        {title}
      </h1>
    </div>
  )
}
