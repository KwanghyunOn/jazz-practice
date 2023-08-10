"use client"

import { useState, Dispatch, SetStateAction } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ScaleType, Scale } from "@/types/music"
import TempoSlider from "@/components/TempoSlider"
import { getScalesFromType } from "@/lib/music"

function Dropdown({
  items,
  selected,
  onSelect,
}: {
  items: string[]
  selected: string
  onSelect: (arg0: string) => void
}) {
  if (!items.includes(selected)) {
    throw Error(`${selected} value not found in item list.`)
  }
  const [isOpen, setIsOpen] = useState(false)

  const chevronDownIcon = (
    <svg
      className="h-6 w-6 stroke-2 stroke-neutral-800 dark:stroke-neutral-100 fill-none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M6 9l6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="z-10 absolute inset-0 backdrop-contrast-[90%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false)
            }}
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="z-10 relative">
        <button
          className="p-2 pl-3 flex flex-row justify-between items-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-xl mr-2">{selected}</p>
          {chevronDownIcon}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{ originX: 1, originY: 1 }}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="absolute right-0 bottom-full mb-2 w-72 grid grid-cols-4 bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-lg"
            >
              {items.map((item) => (
                <button
                  className={`p-2 ${
                    item === selected
                      ? "text-neutral-100 bg-indigo-500"
                      : "opacity-50 hover:opacity-80 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  } text-center text-lg rounded-md`}
                  onClick={() => {
                    setIsOpen(false)
                    onSelect(item)
                  }}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ScaleKeySettings({
  scale,
  setScale,
}: {
  scale: Scale
  setScale: Dispatch<SetStateAction<Scale>>
}) {
  const availableScales = getScalesFromType(scale.type)
  const onSelect = (scaleKey: string) => {
    const selectedScale = availableScales.find(
      (scale) => scale.key === scaleKey
    )
    if (selectedScale) {
      setScale(selectedScale)
    } else {
      throw Error(`${scaleKey} is unavailable in ${scale.type} scale.`)
    }
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-xl font-semibold">Select key</p>
      <Dropdown
        items={availableScales.map((scale) => scale.key)}
        selected={scale.key}
        onSelect={onSelect}
      />
    </div>
  )
}

function ToggleGroup({
  items,
  selected,
  onSelect,
}: {
  items: string[]
  selected: string
  onSelect: (arg0: string) => void
}) {
  if (!items.includes(selected)) {
    throw Error(`${selected} value not found in item list.`)
  }
  return (
    <div className="flex flex-row items-center rounded-md overflow-hidden border border-solid border-neutral-300 dark:border-neutral-700">
      {items.map((item) => (
        <div
          className={`px-4 py-2 cursor-pointer select-none ${
            item === selected
              ? "text-neutral-100 bg-indigo-500"
              : "opacity-50 hover:opacity-80 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          }`}
          onClick={() => {
            onSelect(item)
          }}
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

function ScaleTypeSettings({
  scale,
  setScale,
}: {
  scale: Scale
  setScale: Dispatch<SetStateAction<Scale>>
}) {
  const items: { type: ScaleType; label: string }[] = [
    {
      type: "major",
      label: "major",
    },
    {
      type: "natural minor",
      label: "minor",
    },
  ]
  const onSelect = (label: string) => {
    const selectedItem = items.find((item) => item.label === label)
    if (selectedItem) {
      const availableScales = getScalesFromType(selectedItem.type)
      const selectedScale = availableScales.find((sc) => sc.key === scale.key)
      if (selectedScale) {
        setScale(selectedScale)
      } else {
        setScale(availableScales[0])
      }
    } else {
      throw Error(`${label} do not exist in items.`)
    }
  }

  const selectedItem = items.find((item) => item.type === scale.type)
  if (!selectedItem) {
    throw Error(`${scale.type} scale is not available.`)
  }
  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-xl font-semibold">Scale type</p>
      <ToggleGroup
        items={items.map((item) => item.label)}
        selected={selectedItem.label}
        onSelect={onSelect}
      />
    </div>
  )
}

function ItemWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-md bg-neutral-100 dark:bg-neutral-800">
      {children}
    </div>
  )
}

export default function DiatonicChordPracticeSettings({
  scale,
  setScale,
  bpm,
  setBpm,
}: {
  scale: Scale
  setScale: Dispatch<SetStateAction<Scale>>
  bpm: number
  setBpm: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className="w-screen max-w-xl flex flex-col gap-y-3 p-4 bg-neutral-200 dark:bg-neutral-900 rounded-lg">
      <p className="py-2 text-2xl font-semibold">Settings</p>
      <ItemWrapper>
        <TempoSlider bpm={bpm} setBpm={setBpm} />
      </ItemWrapper>
      <ItemWrapper>
        <ScaleKeySettings scale={scale} setScale={setScale} />
      </ItemWrapper>
      <ItemWrapper>
        <ScaleTypeSettings scale={scale} setScale={setScale} />
      </ItemWrapper>
    </div>
  )
}
