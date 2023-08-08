"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import Settings from "./Settings"
import PlayButton from "@/components/PlayButton"
import Modal from "@/components/Modal"
import ChordDisplay from "@/components/ChordDisplay"
import { MusicKey, Chord, ScaleType, MAJOR_SCALE } from "@/types/chord"
import { getDiatonicChords, getRandomElement } from "@/lib/utils"
import { useStorage } from "@/lib/clientUtils"

export default function DiatonicChordPractice({
  searchParams,
}: {
  searchParams: { settings: boolean }
}) {
  const [scaleType, setScaleType]: [ScaleType, any] = useStorage(
    "scaleType",
    "major"
  )
  const [scaleKey, setScaleKey]: [MusicKey, any] = useStorage("scaleKey", "C")
  const [bpm, setBpm] = useStorage("bpm", 120)
  const [chords, setChords] = useState([{} as Chord, {} as Chord])
  const [isPlaying, setIsPlaying] = useState(false)
  const delay = ((1000 * 60) / bpm) * 4
  const settingsOpen = searchParams.settings

  const diatonicChords = getDiatonicChords(scaleKey, scaleType)
  const getRandomChord = useCallback((): Chord => {
    return getRandomElement(diatonicChords)
  }, [diatonicChords])

  useEffect(() => {
    setChords([getRandomChord(), getRandomChord()])
  }, [])

  useEffect(() => {
    const updateChords = () => {
      setChords((chords) => [...chords.slice(1), getRandomChord()])
    }
    if (isPlaying && !settingsOpen) {
      const intervalId = setInterval(() => {
        updateChords()
      }, delay)
      return () => clearInterval(intervalId)
    }
  }, [isPlaying, settingsOpen, delay, getRandomChord])

  return (
    <div className="h-full pt-12 pb-4 flex flex-col justify-evenly items-center">
      <div className="grow-[2] flex justify-center items-center">
        <ChordDisplay
          chord={chords[0]}
          className="text-8xl md:text-9xl xl:text-10xl"
        />
      </div>
      <div className="grow-[0.5] flex justify-center items-center">
        <p className="text-3xl md:text-4xl xl:text-5xl">Up Next...</p>
      </div>
      <div className="grow-[0.5] flex justify-center items-center">
        <ChordDisplay
          chord={chords[1]}
          className="text-6xl md:text-7xl xl:text-8xl"
        />
      </div>
      <div className="grow-[2] flex justify-center items-center">
        <PlayButton
          isPlaying={isPlaying}
          onClick={() => {
            setIsPlaying(!isPlaying)
          }}
        />
      </div>
      <div className="grow-[1.5] w-full flex justify-center items-center">
        <Link
          href="?settings=true"
          className="w-2/3 max-w-xs md:max-w-sm p-4 btn-primary text-white text-xl md:text-2xl font-semibold rounded-full text-center select-none"
        >
          Settings
        </Link>
      </div>
      <AnimatePresence>
        {settingsOpen && (
          <Modal key="modal" placement="bottom">
            <Settings
              scaleKey={scaleKey}
              setScaleKey={setScaleKey}
              scaleType={scaleType}
              setScaleType={setScaleType}
              bpm={bpm}
              setBpm={setBpm}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
