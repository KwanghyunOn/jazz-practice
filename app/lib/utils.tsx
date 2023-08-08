import {
  MusicKey,
  ChordType,
  ScaleType,
  MAJOR_SCALE,
  Scale,
  MAJOR_DIATONIC_CHORDTYPE,
  Chord,
  NATURAL_MINOR_SCALE,
  NATURAL_MINOR_DIATONIC_CHORDTYPE,
} from "@/types/chord"

export function exhaustiveCheck(param: never) {}

export function getRandomElement<T>(array: Array<T>, defaultValue?: any) {
  if (array.length === 0) return defaultValue
  return array[Math.floor(Math.random() * array.length)]
}

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

export function getScale(scaleKey: MusicKey, scaleType: ScaleType): Scale {
  switch (scaleType) {
    case "major":
      return MAJOR_SCALE[scaleKey]
    case "natural minor":
      return NATURAL_MINOR_SCALE[scaleKey]
    default:
      throw Error(`${scaleType} not implemented yet.`)
  }
}

export function getDiatonicChords(
  scaleKey: MusicKey,
  scaleType: ScaleType
): Chord[] {
  const scale = getScale(scaleKey, scaleType)
  const diatonics =
    scaleType === "major"
      ? MAJOR_DIATONIC_CHORDTYPE
      : NATURAL_MINOR_DIATONIC_CHORDTYPE
  return scale.map((key, index) => {
    return { root: key, type: diatonics[index] }
  })
}
