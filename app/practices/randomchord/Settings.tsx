"use client"

import { useState, useRef, Dispatch, SetStateAction } from "react"
import { usePathname } from "next/navigation"
import CheckBox from "@/components/CheckBox"
import TempoSlider from "@/components/TempoSlider"
import { ChordType, MusicKey, GENERAL_MUSIC_KEYS } from "@/types/music"
import { getChordLabel } from "@/lib/music"
import useStorage from "@/lib/useStorage"
import Switch from "@/components/Switch"

function RootSettings({
  roots,
  setRoots,
  showEnharmonic,
  setShowEnharmonic,
}: {
  roots: { value: MusicKey; active: boolean }[]
  setRoots: Dispatch<SetStateAction<any>>
  showEnharmonic: boolean
  setShowEnharmonic: Dispatch<SetStateAction<boolean>>
}) {
  const handleSwitch = () => {
    if (showEnharmonic) {
      setRoots(
        roots.map((root) => {
          if (GENERAL_MUSIC_KEYS.includes(root.value)) {
            return root
          } else {
            return {
              ...root,
              active: false,
            }
          }
        })
      )
    }
    setShowEnharmonic(!showEnharmonic)
  }

  return (
    <div>
      <p className="mb-2 text-xl font-semibold">Roots</p>
      <div className="my-4 flex flex-row justify-between items-center">
        <p className="text-base">Show enharmonic chords</p>
        <Switch checked={showEnharmonic} onChange={handleSwitch} />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        {roots.map(
          (root) =>
            (showEnharmonic || GENERAL_MUSIC_KEYS.includes(root.value)) && (
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
            )
        )}
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
  showEnharmonic,
  setShowEnharmonic,
  chordTypes,
  setChordTypes,
  bpm,
  setBpm,
}: {
  roots: { value: MusicKey; active: boolean }[]
  setRoots: Dispatch<SetStateAction<any>>
  showEnharmonic: boolean
  setShowEnharmonic: Dispatch<SetStateAction<boolean>>
  chordTypes: { value: ChordType; active: boolean }[]
  setChordTypes: Dispatch<SetStateAction<any>>
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
        <RootSettings
          roots={roots}
          setRoots={setRoots}
          showEnharmonic={showEnharmonic}
          setShowEnharmonic={setShowEnharmonic}
        />
      </ItemWrapper>
      <ItemWrapper>
        <ChordSettings chordTypes={chordTypes} setChordTypes={setChordTypes} />
      </ItemWrapper>
    </div>
  )
}
