import { motion } from "framer-motion"
import { fullTailwindConfig } from "@/lib/tailwind"

export default function Switch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: any
}) {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  // @ts-ignore
  console.log(fullTailwindConfig)
  // @ts-ignore
  const bgColorOn = isDarkMode
    ? // @ts-ignore
      fullTailwindConfig.theme.colors.indigo[500]
    : // @ts-ignore
      fullTailwindConfig.theme.colors.indigo[400]
  // @ts-ignore
  const bgColorOff = isDarkMode
    ? // @ts-ignore
      fullTailwindConfig.theme.colors.neutral[600]
    : // @ts-ignore
      fullTailwindConfig.theme.colors.neutral[300]

  return (
    <motion.div
      layout
      animate={{
        backgroundColor: checked ? bgColorOn : bgColorOff,
      }}
      className={`w-[3.06rem] h-[1.8rem] p-[0.18rem] flex items-center cursor-pointer rounded-full
          ${checked ? "justify-end" : "justify-start"}`}
      onClick={onChange}
    >
      <motion.div
        layout
        className={`w-[1.44rem] h-[1.44rem] rounded-full bg-neutral-50`}
      ></motion.div>
    </motion.div>
  )
}
