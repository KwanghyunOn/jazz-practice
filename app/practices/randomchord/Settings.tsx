"use client"

import { useState, Dispatch, SetStateAction } from "react"
import { ChordType, MusicKey } from "@/types/chord"
import CheckBox from "@/components/CheckBox"
import { getChordLabel } from "@/lib/utils"

export function TempoSlider({
  bpm,
  setBpm,
}: {
  bpm: number
  setBpm: Dispatch<SetStateAction<number>>
}) {
  const minBpm = 30
  const maxBpm = 200
  const [sliderValue, setSliderValue] = useState(bpm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value))
  }

  const handleMouseUp = () => {
    setBpm(sliderValue)
  }

  return (
    <>
      <div className="mb-2 flex flex-row justify-between items-center">
        <p className="text-xl font-semibold">Tempo</p>
        <p className="text-xl">{sliderValue} bpm</p>
      </div>
      <input
        type="range"
        min={minBpm}
        max={maxBpm}
        value={sliderValue}
        className="w-full h-3 bg-indigo-400 dark:bg-indigo-500 rounded-full appearance-none cursor-pointer"
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </>
  )
}

function RootSettings({
  roots,
  setRoots,
}: {
  roots: { value: MusicKey; active: boolean }[]
  setRoots: Dispatch<SetStateAction<any>>
}) {
  return (
    <div>
      <p className="mb-2 text-xl font-semibold">Roots</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        {roots.map((root) => (
          <button
            className={`px-2 py-2 text-lg font-semibold rounded-md btn-primary ${
              root.active ? "" : "opacity-50"
            }`}
            onClick={(e) => {
              setRoots(
                roots.map((root) => {
                  if (root.value === e.currentTarget.name) {
                    return {
                      ...root,
                      active: !root.active,
                    }
                  } else {
                    return root
                  }
                })
              )
            }}
            name={root.value}
            key={root.value}
          >
            {root.value}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChordSettings({
  chordTypes,
  setChordTypes,
}: {
  chordTypes: { value: ChordType; active: boolean }[]
  setChordTypes: Dispatch<SetStateAction<any>>
}) {
  const triadValues = ["major", "minor", "dim", "aug"]
  const seventhValues = [
    "major7",
    "minor7",
    "dominant7",
    "dim7",
    "aug7",
    "halfdim7",
  ]
  const triads = chordTypes.filter((chordType) =>
    triadValues.includes(chordType.value)
  )
  const sevenths = chordTypes.filter((chordType) =>
    seventhValues.includes(chordType.value)
  )

  return (
    <div>
      <p className="mb-2 text-xl font-semibold">Chords</p>
      <div className="grid grid-cols-2">
        <div>
          <CheckBox
            size="md"
            name="triads"
            label="Triads"
            checked={triads.some((chordType) => chordType.active)}
            onChange={(e) => {
              setChordTypes([
                ...triads.map((chordType) => ({
                  ...chordType,
                  active: e.currentTarget.checked,
                })),
                ...sevenths,
              ])
            }}
          />
          <div className="flex flex-col ml-2 gap-0.5">
            {triads.map((chordType) => (
              <CheckBox
                size="sm"
                name={chordType.value}
                label={getChordLabel(chordType.value)}
                checked={chordType.active}
                onChange={(e) => {
                  setChordTypes(
                    chordTypes.map((chordType) => {
                      if (chordType.value === e.target.name) {
                        return {
                          ...chordType,
                          active: e.target.checked,
                        }
                      } else {
                        return chordType
                      }
                    })
                  )
                }}
                key={chordType.value}
              />
            ))}
          </div>
        </div>
        <div>
          <CheckBox
            size="md"
            name="sevenths"
            label="7th Chords"
            checked={sevenths.some((chordType) => chordType.active)}
            onChange={(e) => {
              setChordTypes([
                ...sevenths.map((chordType) => ({
                  ...chordType,
                  active: e.currentTarget.checked,
                })),
                ...triads,
              ])
            }}
          />
          <div className="flex flex-col ml-2 gap-0.5">
            {sevenths.map((chordType) => (
              <CheckBox
                size="sm"
                name={chordType.value}
                label={getChordLabel(chordType.value)}
                checked={chordType.active}
                onChange={(e) => {
                  setChordTypes(
                    chordTypes.map((chordType) => {
                      if (chordType.value === e.target.name) {
                        return {
                          ...chordType,
                          active: e.target.checked,
                        }
                      } else {
                        return chordType
                      }
                    })
                  )
                }}
                key={chordType.value}
              />
            ))}
          </div>
        </div>
      </div>
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

export default function RandomChordPracticeSettings({
  roots,
  setRoots,
  chordTypes,
  setChordTypes,
  bpm,
  setBpm,
}: {
  roots: { value: MusicKey; active: boolean }[]
  setRoots: Dispatch<SetStateAction<any>>
  chordTypes: { value: ChordType; active: boolean }[]
  setChordTypes: Dispatch<SetStateAction<any>>
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
        <RootSettings roots={roots} setRoots={setRoots} />
      </ItemWrapper>
      <ItemWrapper>
        <ChordSettings chordTypes={chordTypes} setChordTypes={setChordTypes} />
      </ItemWrapper>
    </div>
  )
}