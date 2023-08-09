import { exhaustiveCheck } from "./utils"
import {
  MusicKey,
  ChordType,
  ScaleType,
  Scale,
  Chord,
  Interval,
  MAJOR_SCALES,
  MAJOR_DIATONIC_CHORDTYPE,
  NATURAL_MINOR_SCALES,
  NATURAL_MINOR_DIATONIC_CHORDTYPE,
} from "@/types/music"

export function getChordLabel(chordType: ChordType) {
  switch (chordType) {
    case "major":
      return "Major"
    case "minor":
      return "Minor"
    case "dim":
      return "Diminished (°)"
    case "aug":
      return "Augmented (+)"
    case "major7":
      return "Major 7th"
    case "minor7":
      return "Minor 7th"
    case "dominant7":
      return "Dominant 7th"
    case "dim7":
      return "Diminished 7th"
    case "aug7":
      return "Augmented 7th"
    case "halfdim7":
      return "Half-diminished (m7♭5, ø)"
    default:
      exhaustiveCheck(chordType)
      throw new TypeError(`Unhandled chord type: ${chordType}`)
  }
}

export function getScalesFromType(scaleType: ScaleType): Scale[] {
  switch (scaleType) {
    case "major":
      return MAJOR_SCALES
    case "natural minor":
      return NATURAL_MINOR_SCALES
  }
}

export function getDiatonicChords(scale: Scale): Chord[] {
  const diatonics: ChordType[] = (() => {
    switch (scale.type) {
      case "major":
        return MAJOR_DIATONIC_CHORDTYPE
      case "natural minor":
        return NATURAL_MINOR_DIATONIC_CHORDTYPE
    }
  })()

  return scale.notes.map((note, index) => {
    return { root: note, type: diatonics[index] }
  })
}

export function keyToSemitone(key: MusicKey): number {
  switch (key) {
    case "A":
      return 0
    case "A♯":
    case "B♭":
      return 1
    case "B":
    case "C♭":
      return 2
    case "B♯":
    case "C":
      return 3
    case "C♯":
    case "D♭":
      return 4
    case "D":
      return 5
    case "D♯":
    case "E♭":
      return 6
    case "E":
    case "F♭":
      return 7
    case "E♯":
    case "F":
      return 8
    case "F♯":
    case "G♭":
      return 9
    case "G":
      return 10
    case "G♯":
    case "A♭":
      return 11
  }
}

export const SEMITONES_TO_KEYS: (MusicKey | MusicKey[])[] = [
  "A",
  ["A♯", "B♭"],
  ["B", "C♭"],
  ["B♯", "C"],
  ["C♯", "D♭"],
  "D",
  ["D♯", "E♭"],
  ["E", "F♭"],
  ["E♯", "F"],
  ["F♯", "G♭"],
  "G",
  ["G♯", "A♭"],
]

function getModular(value: number, mod: number) {
  value = value % mod
  return value >= 0 ? value : value + mod
}

export function semitonesToKey(semitones: number) {
  return SEMITONES_TO_KEYS[getModular(semitones, 12)]
}

export function intervalToSemitone(interval: Interval) {
  switch (interval) {
    case "minor 2nd":
      return 1
    case "major 2nd":
      return 2
    case "minor 3rd":
      return 3
    case "major 3rd":
      return 4
    case "perfect 4th":
      return 5
    case "tritone":
    case "augmented 4th":
    case "diminished 5th":
      return 6
    case "perfect 5th":
      return 7
    case "minor 6th":
    case "augmented 5th":
      return 8
    case "major 6th":
      return 9
    case "minor 7th":
    case "augmented 6th":
      return 10
    case "major 7th":
      return 11
  }
}

export function getDistance(
  root: MusicKey,
  target: MusicKey,
  invert: boolean = false
): number {
  const dist = invert
    ? keyToSemitone(root) - keyToSemitone(target)
    : keyToSemitone(target) - keyToSemitone(root)
  return dist >= 0 ? dist : dist + 12
}

export function calculateKeyFromInterval(
  root: MusicKey,
  interval: Interval,
  invert: boolean = false
): MusicKey | MusicKey[] {
  const distance = intervalToSemitone(interval)
  const targetInSemitone = keyToSemitone(root) + (invert ? -distance : distance)
  return semitonesToKey(targetInSemitone)
}
