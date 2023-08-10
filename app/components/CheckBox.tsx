import { useRef } from "react"

export default function CheckBox({
  name,
  label,
  checked,
  onChange,
  size = "md",
  containerClass = "",
  labelClass = "",
}: {
  name: string
  label: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  size?: "sm" | "md" | "lg" | "xl"
  containerClass?: string
  labelClass?: string
}) {
  let containerSize, inputSize, svgSize, labelSize
  switch (size) {
    case "sm":
      containerSize = "p-[0.3rem]"
      inputSize = "h-[1rem] w-[1rem]"
      svgSize = "h-[0.8rem] w-[0.8rem] stroke-[0.2rem]"
      labelSize = "ml-[0.4rem] text-[0.8rem]"
      break
    case "md":
      containerSize = "p-[0.33rem]"
      inputSize = "h-[1.1rem] w-[1.1rem]"
      svgSize = "h-[0.88rem] w-[0.88rem] stroke-[0.22rem]"
      labelSize = "ml-[0.44rem] text-[0.88rem]"
      break
    case "lg":
      containerSize = "p-[0.36rem]"
      inputSize = "h-[1.2rem] w-[1.2rem]"
      svgSize = "h-[0.96rem] w-[0.96rem] stroke-[0.24rem]"
      labelSize = "ml-[0.48rem] text-[0.96rem]"
      break
    case "xl":
      containerSize = "p-[0.42rem]"
      inputSize = "h-[1.4rem] w-[1.4rem]"
      svgSize = "h-[1.12rem] w-[1.12rem] stroke-[0.28rem]"
      labelSize = "ml-[0.56rem] text-[1.12rem]"
      break
  }
  const inputRef = useRef<HTMLInputElement>(null)

  const checkIcon = (
    <svg
      className={`${svgSize} peer-checked:block absolute hidden pointer-events-none stroke-white fill-none`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
  return (
    <div
      className={`${containerSize} flex flex-row justify-start items-center hover:bg-slate-100 hover:dark:bg-neutral-700 rounded-md cursor-pointer ${containerClass}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (inputRef.current) inputRef.current.click()
        }
      }}
    >
      <div className="relative flex items-center justify-center">
        <input
          className={`peer shrink-0 ${inputSize} border-[0.1rem] border-slate-400 appearance-none outline-none rounded-sm cursor-pointer
        checked:bg-indigo-700 checked:border-indigo-700`}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={name}
          id={name}
          ref={inputRef}
        />
        {checkIcon}
      </div>
      <label
        className={`grow ${labelSize} select-none cursor-pointer ${labelClass}`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  )
}
