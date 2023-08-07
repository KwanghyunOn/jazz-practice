export default function CheckBox({
  name,
  label,
  checked,
  onChange,
  size = "md",
}: {
  name: string
  label: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  size: "sm" | "md"
}) {
  let inputSize, svgSize, labelSize
  switch (size) {
    case "sm":
      inputSize = "h-4 w-4"
      svgSize = "ml-[0.1rem] h-3 w-3"
      labelSize = "pl-1 text-md"
      break
    case "md":
      inputSize = "h-5 w-5"
      svgSize = "ml-[0.125rem] h-[0.9375rem] w-[0.9375rem]"
      labelSize = "pl-[0.3125rem] text-lg"
      break
    default:
      throw new TypeError(`${size} is undefined size prop.`)
  }
  return (
    <div className="flex flex-row justify-start items-center px-1 py-0.5 hover:bg-slate-100 hover:dark:bg-neutral-700 rounded-md">
      <input
        className={`shrink-0 relative peer ${inputSize} border-[0.1rem] border-slate-400 appearance-none outline-none rounded-sm
        checked:bg-indigo-700 checked:border-indigo-700`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        id={name}
      />
      <label
        className={`grow ${labelSize} hover:cursor-pointer select-none`}
        htmlFor={name}
      >
        {label}
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`absolute hidden peer-checked:block pointer-events-none ${svgSize} stroke-white stroke-2`}
      >
        <path
          fillRule="evenodd"
          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
