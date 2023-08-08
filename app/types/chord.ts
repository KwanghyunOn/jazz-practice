export type MusicKey =
  | "A♭"
  | "A"
  | "A♯"
  | "B♭"
  | "B"
  | "B♯"
  | "C♭"
  | "C"
  | "C♯"
  | "D♭"
  | "D"
  | "D♯"
  | "E♭"
  | "E"
  | "E♯"
  | "F♭"
  | "F"
  | "F♯"
  | "G♭"
  | "G"
  | "G♯"

export const MUSIC_KEYS: MusicKey[] = [
  "A♭",
  "A",
  "A♯",
  "B♭",
  "B",
  "B♯",
  "C♭",
  "C",
  "C♯",
  "D♭",
  "D",
  "D♯",
  "E♭",
  "E",
  "E♯",
  "F",
  "F♯",
  "G♭",
  "G",
  "G♯",
]

export const GENERAL_MUSIC_KEYS: MusicKey[] = [
  "A♭",
  "A",
  "B♭",
  "B",
  "C",
  "C♯",
  "D♭",
  "D",
  "E♭",
  "E",
  "F",
  "F♯",
  "G♭",
  "G",
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

export type ScaleType = "major" | "natural minor"
export type Scale = MusicKey[]

export const MAJOR_SCALE = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  G: ["G", "A", "B", "C", "D", "E", "F♯"],
  D: ["D", "E", "F♯", "G", "A", "B", "C♯"],
  A: ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
  E: ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"],
  B: ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"],
  "F♯": ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯"],
  "G♭": ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"],
  "D♭": ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"],
  "C♯": ["C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯"],
  "A♭": ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"],
  "E♭": ["E♭", "F", "G", "A♭", "B♭", "C", "D"],
  "B♭": ["B♭", "C", "D", "E♭", "F", "G", "A"],
  F: ["F", "G", "A", "B♭", "C", "D", "E"],
}

export const NATURAL_MINOR_SCALE = {
  A: ["A", "B", "C", "D", "E", "F", "G"],
  E: ["E", "F♯", "G", "A", "B", "C", "D"],
  B: ["B", "C♯", "D", "E", "F♯", "G", "A"],
  "F♯": ["F♯", "G♯", "A", "B", "C♯", "D", "E"],
  "C♯": ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"],
  "G♯": ["G♯", "A♯", "B", "C♯", "D♯", "E", "F♯"],
  "A♭": ["A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭"],
  "D♯": ["D♯", "E♯", "F♯", "G♯", "A♯", "B", "C♯"],
  "E♭": ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"],
  "A♯": ["A♯", "B♯", "C♯", "D♯", "E♯", "F♯", "G♯"],
  "B♭": ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
  F: ["F", "G", "A♭", "B♭", "C", "D♭", "E♭"],
  C: ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
  G: ["G", "A", "B♭", "C", "D", "E♭", "F"],
  D: ["D", "E", "F", "G", "A", "B♭", "C"],
}

export const MAJOR_DIATONIC_CHORDTYPE: ChordType[] = [
  "major7",
  "minor7",
  "minor7",
  "major7",
  "dominant7",
  "minor7",
  "halfdim7",
]

export const NATURAL_MINOR_DIATONIC_CHORDTYPE: ChordType[] = [
  "minor7",
  "dim7",
  "major7",
  "minor7",
  "minor7",
  "major7",
  "dominant7",
]
