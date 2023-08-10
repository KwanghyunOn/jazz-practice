import { Dispatch, SetStateAction } from "react"
import { MusicKey, Interval } from "@/types/music"
import CheckBox from "@/components/CheckBox"

function QuizStart({ onStart }: { onStart: React.MouseEventHandler }) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg flex flex-col items-center p-6 gap-6">
      <div className="w-[80%] text-center text-xl font-semibold">
        Choose the right key for each question.
      </div>
      <div className="px-4 py-2 gap-2 flex flex-col border border-solid border-neutral-600 rounded-md">
        <p className="text-lg font-semibold">Example</p>
        <div>
          <p className="text-lg">Q) Major 6th of Eb?</p>
          <p className="text-lg">A) C</p>
        </div>
      </div>
      <button
        className="btn-primary w-1/2 self-center p-2 text-xl font-semibold"
        onClick={onStart}
      >
        <p>Start quiz</p>
      </button>
    </div>
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
      <p className="py-2 text-xl font-semibold">Roots</p>
      <div className="py-1 grid grid-cols-4 sm:grid-cols-6 gap-1.5">
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

function IntervalsSettings({
  intervals,
  setIntervals,
}: {
  intervals: { value: Interval; active: boolean }[]
  setIntervals: Dispatch<SetStateAction<any>>
}) {
  const isDiatonic = (interval: Interval) =>
    interval.includes("major") || interval.includes("perfect")
  return (
    <div>
      <p className="py-2 text-xl font-semibold">Intervals</p>
      <p className="py-1 text-base font-semibold">Diatonics</p>
      <div className="grid grid-cols-2 gap-1">
        {intervals
          .filter((interval) => isDiatonic(interval.value))
          .map((interval) => (
            <CheckBox
              name={interval.value}
              label={interval.value}
              checked={interval.active}
              size="lg"
              onChange={(e) => {
                setIntervals(
                  intervals.map((interval) => {
                    if (interval.value === e.currentTarget.name) {
                      return {
                        ...interval,
                        active: !interval.active,
                      }
                    } else {
                      return interval
                    }
                  })
                )
              }}
              key={interval.value}
            />
          ))}
      </div>
      <p className="py-1 text-base font-semibold">Non-diatonics</p>
      <div className="grid grid-cols-2 gap-1">
        {intervals
          .filter((interval) => !isDiatonic(interval.value))
          .map((interval) => (
            <CheckBox
              name={interval.value}
              label={interval.value
                .replace("diminished", "dim")
                .replace("augmented", "aug")}
              checked={interval.active}
              size="lg"
              onChange={(e) => {
                setIntervals(
                  intervals.map((interval) => {
                    if (interval.value === e.currentTarget.name) {
                      return {
                        ...interval,
                        active: !interval.active,
                      }
                    } else {
                      return interval
                    }
                  })
                )
              }}
              key={interval.value}
            />
          ))}
      </div>
    </div>
  )
}

function ItemWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
      {children}
    </div>
  )
}

export default function IntervalQuizHome({
  roots,
  setRoots,
  intervals,
  setIntervals,
  onStart,
}: {
  roots: { value: MusicKey; active: boolean }[]
  setRoots: Dispatch<SetStateAction<any>>
  intervals: { value: Interval; active: boolean }[]
  setIntervals: Dispatch<SetStateAction<any>>
  onStart: React.MouseEventHandler
}) {
  return (
    <div className="w-screen max-w-xl flex flex-col gap-y-3 p-4 bg-neutral-200 dark:bg-neutral-900 rounded-lg">
      <QuizStart onStart={onStart} />
      <p className="py-1 text-xl font-semibold">Quiz Settings</p>
      <ItemWrapper>
        <RootSettings roots={roots} setRoots={setRoots} />
      </ItemWrapper>
      <ItemWrapper>
        <IntervalsSettings intervals={intervals} setIntervals={setIntervals} />
      </ItemWrapper>
    </div>
  )
}
