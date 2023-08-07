export type MusicKey =
  | "A"
  | "A♯"
  | "B♭"
  | "B"
  | "C"
  | "C♯"
  | "D♭"
  | "D"
  | "D♯"
  | "E♭"
  | "E"
  | "F"
  | "F♯"
  | "G♭"
  | "G"
  | "G♯"
  | "A♭"

export const MUSIC_KEYS: MusicKey[] = [
  "A",
  "A♯",
  "B♭",
  "B",
  "C",
  "C♯",
  "D♭",
  "D",
  "D♯",
  "E♭",
  "E",
  "F",
  "F♯",
  "G♭",
  "G",
  "G♯",
  "A♭",
]

export type ChordType =
  | "major"
  | "minor"
  | "dim"
  | "aug"
  | "major7"
  | "minor7"
  | "dominant7"
  | "dim7"
  | "aug7"
  | "halfdim7"

export const CHORD_TYPES: ChordType[] = [
  "major",
  "minor",
  "dim",
  "aug",
  "major7",
  "minor7",
  "dominant7",
  "dim7",
  "aug7",
  "halfdim7",
]

export type Chord = {
  root: MusicKey
  type: ChordType
}
