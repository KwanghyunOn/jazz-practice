"use client"

import { useState, Dispatch, SetStateAction } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChordType,
  MAJOR_SCALE,
  MusicKey,
  NATURAL_MINOR_SCALE,
  ScaleType,
} from "@/types/chord"
import TempoSlider from "@/components/TempoSlider"

function Dropdown({
  items,
  defaultItem,
  onSelect,
}: {
  items: string[]
  defaultItem: string
  onSelect: (arg0: string) => void
}) {
  if (!items.includes(defaultItem)) {
    throw Error(`${defaultItem} value not found in item list.`)
  }
  const [selected, setSelected] = useState(defaultItem)
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
            onClick={(e) => {
              console.log("backdrop!")
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
                    setSelected(item)
                    setIsOpen(false)
                    onSelect(item)
                  }}
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
  scaleKey,
  setScaleKey,
  scaleType,
}: {
  scaleKey: MusicKey
  setScaleKey: Dispatch<SetStateAction<any>>
  scaleType: ScaleType
}) {
  let availableKeys: MusicKey[]
  switch (scaleType) {
    case "major":
      availableKeys = Object.keys(MAJOR_SCALE) as MusicKey[]
      break
    case "natural minor":
      availableKeys = Object.keys(NATURAL_MINOR_SCALE) as MusicKey[]
      break
    default:
      throw new Error(`${scaleType} not implemented.`)
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-xl font-semibold">Select key</p>
      <Dropdown
        items={availableKeys}
        defaultItem={scaleKey}
        onSelect={(item) => setScaleKey(item)}
      />
    </div>
  )
}

function ToggleGroup({
  items,
  defaultItem,
  onSelect,
}: {
  items: string[]
  defaultItem: string
  onSelect: (arg0: string) => void
}) {
  const [selected, setSelected] = useState(defaultItem)
  if (!items.includes(defaultItem)) {
    throw Error(`${defaultItem} value not found in item list.`)
  }
  return (
    <div className="flex flex-row items-center rounded-md overflow-hidden border border-solid border-neutral-300 dark:border-neutral-700">
      {items.map((item) => (
        <div
          className={`px-4 py-2 ${
            item === selected
              ? "text-neutral-100 bg-indigo-500"
              : "opacity-50 hover:opacity-80 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          }`}
          onClick={() => {
            setSelected(item)
            onSelect(item)
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

function ScaleTypeSettings({
  scaleType,
  setScaleType,
}: {
  scaleType: ScaleType
  setScaleType: Dispatch<SetStateAction<any>>
}) {
  const items: ScaleType[] = ["major", "natural minor"]
  const label = { major: "major", "natural minor": "minor" }
  const onSelect = (item: string) => {
    if (item === "major") setScaleType("major")
    else if (item === "minor") setScaleType("natural minor")
  }
  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-xl font-semibold">Scale type</p>
      <ToggleGroup
        items={items.map((item) => label[item])}
        defaultItem="major"
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
  scaleKey,
  setScaleKey,
  scaleType,
  setScaleType,
  bpm,
  setBpm,
}: {
  scaleKey: MusicKey
  setScaleKey: Dispatch<SetStateAction<any>>
  scaleType: ScaleType
  setScaleType: Dispatch<SetStateAction<any>>
  bpm: number
  setBpm: Dispatch<SetStateAction<any>>
}) {
  return (
    <div className="w-screen max-w-xl flex flex-col gap-y-3 p-4 bg-neutral-200 dark:bg-neutral-900 rounded-lg">
      <p className="py-2 text-2xl font-semibold">Settings</p>
      <ItemWrapper>
        <TempoSlider bpm={bpm} setBpm={setBpm} />
      </ItemWrapper>
      <ItemWrapper>
        <ScaleKeySettings
          scaleKey={scaleKey}
          setScaleKey={setScaleKey}
          scaleType={scaleType}
        />
      </ItemWrapper>
      <ItemWrapper>
        <ScaleTypeSettings scaleType={scaleType} setScaleType={setScaleType} />
      </ItemWrapper>
    </div>
  )
}
