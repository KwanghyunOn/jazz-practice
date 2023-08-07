import Link from "next/link"

function MenuLink({
  href,
  title,
  desc,
  disabled = false,
}: {
  href: string
  title: string
  desc: string
  disabled?: boolean
}) {
  const chevronRightIcon = (
    <svg
      className="h-8 w-8 stroke-1 stroke-neutral-800 fill-none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
  return (
    <Link
      href={href}
      className={`${disabled && "pointer-events-none opacity-50"}`}
    >
      <div className="w-full p-4 pr-2 flex flex-row justify-between items-center bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg">
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-base">{desc}</p>
        </div>
        <div>{chevronRightIcon}</div>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Jazz practices</h2>
      <div className="flex flex-col gap-2">
        <MenuLink
          href="/practices/randomchord"
          title="Random chord practice"
          desc="Practice random chords."
        />
        <MenuLink
          href="/practices/diatonicchord"
          title="Diatonic chord practice"
          desc="Practice diatonic chords."
        />
        <MenuLink
          href="#"
          title="Interval quiz"
          desc="Interval quiz..."
          disabled
        />
      </div>
    </main>
  )
}
