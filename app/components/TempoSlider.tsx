"use client"

import { useState, useEffect, Dispatch, SetStateAction } from "react"

export default function TempoSlider({
  bpm,
  setBpm,
}: {
  bpm: number
  setBpm: Dispatch<SetStateAction<number>>
}) {
  const minBpm = 30
  const maxBpm = 200
  const [sliderValue, setSliderValue] = useState(bpm)

  useEffect(() => setSliderValue(bpm), [bpm])

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
