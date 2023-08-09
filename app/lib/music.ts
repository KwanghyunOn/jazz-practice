import { exhaustiveCheck } from "./utils"
import {
  ChordType,
  ScaleType,
  Scale,
  Chord,
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
