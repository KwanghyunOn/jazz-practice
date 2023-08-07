"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import Settings from "./Settings"
import PlayButton from "@/components/PlayButton"
import Modal from "@/components/Modal"
import ChordDisplay from "@/components/ChordDisplay"
import { Chord, MUSIC_KEYS, CHORD_TYPES } from "@/types/chord"
import { getRandomElement } from "@/lib/utils"

export default function RandomChordPractice({
  searchParams,
}: {
  searchParams: { settings: boolean }
}) {
  const [roots, setRoots] = useState(
    MUSIC_KEYS.map((musicKey) => {
      return { value: musicKey, active: true }
    })
  )
  const [chordTypes, setChordTypes] = useState(
    CHORD_TYPES.map((ct) => {
      return { value: ct, active: true }
    })
  )
  const [chords, setChords] = useState([{} as Chord, {} as Chord])
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState<number>(120)
  const delay = ((1000 * 60) / bpm) * 4
  const settingsOpen = searchParams.settings

  const getRandomChord = useCallback((): Chord => {
    return {
      root: getRandomElement(
        roots.filter((root) => root.active).map((root) => root.value)
      ),
      type: getRandomElement(
        chordTypes.filter((ct) => ct.active).map((ct) => ct.value)
      ),
    }
  }, [roots, chordTypes])

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
    <div className="h-full py-12 flex flex-col justify-evenly items-center">
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
      <div className="grow-[1] flex justify-center items-center">
        <PlayButton
          isPlaying={isPlaying}
          onClick={(e) => {
            setIsPlaying(!isPlaying)
          }}
        />
      </div>
      <div className="w-full grow-[1] flex justify-center items-center">
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
              roots={roots}
              setRoots={setRoots}
              chordTypes={chordTypes}
              setChordTypes={setChordTypes}
              bpm={bpm}
              setBpm={setBpm}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
