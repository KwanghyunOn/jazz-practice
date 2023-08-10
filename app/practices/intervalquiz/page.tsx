"use client"

import { useState, useEffect, useRef } from "react"
import { calculateKeyFromInterval } from "@/lib/music"
import { getRandomElement } from "@/lib/utils"
import {
  MusicKey,
  Interval,
  INTERVALS,
  GENERAL_MUSIC_KEYS,
  MUSIC_KEYS,
} from "@/types/music"
import useStorage from "@/lib/useStorage"
import { usePathname } from "next/navigation"
import IntervalQuizHome from "./QuizHome"

type IntervalQuiz = {
  root: MusicKey
  interval: Interval
  invert: boolean
  answer: MusicKey | MusicKey[]
}

type QuizResult = {
  total: number
  correct: number
  totalResponseTime: number
}

const getRandomQuiz = (): IntervalQuiz => {
  const root = getRandomElement(GENERAL_MUSIC_KEYS)
  const interval = getRandomElement(INTERVALS)
  return {
    root: root,
    interval: interval,
    invert: false,
    answer: calculateKeyFromInterval(root, interval),
  }
}

export default function IntervalQuizPractice() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [intervals, setIntervals] = useState(
    INTERVALS.map((interval) => ({ value: interval, active: true }))
  )
  const [roots, setRoots] = useState(
    GENERAL_MUSIC_KEYS.map((root) => ({ value: root, active: true }))
  )
  const [quiz, setQuiz] = useState<IntervalQuiz>({} as IntervalQuiz)
  const [result, setResult] = useState<QuizResult>({
    total: 0,
    correct: 0,
    totalResponseTime: 0.0,
  })
  const [guess, setGuess] = useState<MusicKey | null>(null)
  const quizStartTime = useRef<number>(new Date().getTime())

  const pathname = usePathname()
  useStorage(`${pathname}:intervals`, intervals, setIntervals)
  useStorage(`${pathname}:roots`, roots, setRoots)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setGuess(e.currentTarget.name as MusicKey)
  }

  useEffect(() => {
    if (quizStarted) {
      setQuiz(getRandomQuiz())
      setResult({ total: 0, correct: 0, totalResponseTime: 0.0 })
      quizStartTime.current = new Date().getTime()
    }
  }, [quizStarted])

  useEffect(() => {
    if (guess) {
      setResult({
        total: result.total + 1,
        correct: quiz.answer.includes(guess)
          ? result.correct + 1
          : result.correct,
        totalResponseTime:
          result.totalResponseTime +
          (new Date().getTime() - quizStartTime.current),
      })
      const intervalId = setTimeout(() => {
        setGuess(null)
      }, 1000)
      return () => {
        clearInterval(intervalId)
        setQuiz(getRandomQuiz())
        quizStartTime.current = new Date().getTime()
      }
    }
  }, [guess])

  return !quizStarted ? (
    <IntervalQuizHome
      roots={roots}
      setRoots={setRoots}
      intervals={intervals}
      setIntervals={setIntervals}
      onStart={() => {
        setQuizStarted(true)
      }}
    />
  ) : (
    <div className="w-screen max-w-xl flex flex-col items-center gap-8 pt-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-4xl font-semibold">{quiz.interval}</p>
        <p className="text-2xl">of</p>
        <p className="text-4xl font-semibold">{quiz.root}</p>
      </div>
      <div className="w-[90%] grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        {MUSIC_KEYS.map((root) => (
          <button
            className={`px-2 py-2 text-lg font-semibold rounded-md btn-primary
            ${
              guess
                ? `${
                    quiz.answer.includes(root)
                      ? "bg-green-600"
                      : guess === root
                      ? "bg-red-600"
                      : "bg-neutral-400 dark:bg-neutral-500"
                  } pointer-events-none`
                : ""
            }`}
            onClick={handleSubmit}
            name={root}
            key={root}
          >
            {root}
          </button>
        ))}
      </div>
      <div className="text-xl flex flex-col items-center">
        <p>{`Score: ${result.correct} / ${result.total}`}</p>
        <p>{`Average time: ${
          result.total === 0
            ? "-"
            : (result.totalResponseTime / result.total / 1000).toFixed(2)
        }s`}</p>
      </div>
      <button
        className="btn-primary self-center px-10 py-2 text-xl font-semibold"
        onClick={() => {
          setQuizStarted(false)
        }}
      >
        <p>Stop quiz</p>
      </button>
    </div>
  )
}
