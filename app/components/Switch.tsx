import { motion } from "framer-motion"
import { fullTailwindConfig } from "@/lib/tailwind"

export default function Switch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: any
}) {
  // @ts-ignore
  const bgColorOn = fullTailwindConfig.theme.colors.indigo[500]
  // @ts-ignore
  const bgColorOff = fullTailwindConfig.theme.colors.neutral[600]

  return (
    <motion.div
      layout
      animate={{
        backgroundColor: checked ? bgColorOn : bgColorOff,
      }}
      className={`w-[3.06rem] h-[1.8rem] p-[0.18rem] flex items-center cursor-pointer rounded-full
          ${
            checked
              ? "bg-indigo-500 justify-end"
              : "bg-neutral-500 justify-start"
          }`}
      onClick={onChange}
    >
      <motion.div
        layout
        className={`w-[1.44rem] h-[1.44rem] rounded-full bg-neutral-50`}
      ></motion.div>
    </motion.div>
  )
}
