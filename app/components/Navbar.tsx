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
    <div className="relative w-full h-14 px-2 bg-neutral-100 dark:bg-neutral-800 grid grid-cols-2 items-center">
      <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold text-xl text-center whitespace-nowrap">
        {title}
      </h1>
      <div className="flex items-center">{contentLeft}</div>
      <div className="flex items-center justify-end">{contentRight}</div>
    </div>
  )
}
