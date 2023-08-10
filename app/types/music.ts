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
  "A",
  "A♯",
  "B♭",
  "B",
  "C♭",
  "B♯",
  "C",
  "C♯",
  "D♭",
  "D",
  "D♯",
  "E♭",
  "E",
  "F♭",
  "E♯",
  "F",
  "F♯",
  "G♭",
  "G",
  "G♯",
  "A♭",
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
export type Scale = { key: MusicKey; type: ScaleType; notes: MusicKey[] }

export const MAJOR_SCALES: Scale[] = [
  { key: "C", type: "major", notes: ["C", "D", "E", "F", "G", "A", "B"] },
  { key: "G", type: "major", notes: ["G", "A", "B", "C", "D", "E", "F♯"] },
  { key: "D", type: "major", notes: ["D", "E", "F♯", "G", "A", "B", "C♯"] },
  { key: "A", type: "major", notes: ["A", "B", "C♯", "D", "E", "F♯", "G♯"] },
  { key: "E", type: "major", notes: ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"] },
  { key: "B", type: "major", notes: ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"] },
  {
    key: "F♯",
    type: "major",
    notes: ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯"],
  },
  {
    key: "G♭",
    type: "major",
    notes: ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"],
  },
  { key: "D♭", type: "major", notes: ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"] },
  {
    key: "C♯",
    type: "major",
    notes: ["C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯"],
  },
  { key: "A♭", type: "major", notes: ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"] },
  { key: "E♭", type: "major", notes: ["E♭", "F", "G", "A♭", "B♭", "C", "D"] },
  { key: "B♭", type: "major", notes: ["B♭", "C", "D", "E♭", "F", "G", "A"] },
  { key: "F", type: "major", notes: ["F", "G", "A", "B♭", "C", "D", "E"] },
]

export const NATURAL_MINOR_SCALES: Scale[] = [
  {
    key: "A",
    type: "natural minor",
    notes: ["A", "B", "C", "D", "E", "F", "G"],
  },
  {
    key: "E",
    type: "natural minor",
    notes: ["E", "F♯", "G", "A", "B", "C", "D"],
  },
  {
    key: "B",
    type: "natural minor",
    notes: ["B", "C♯", "D", "E", "F♯", "G", "A"],
  },
  {
    key: "F♯",
    type: "natural minor",
    notes: ["F♯", "G♯", "A", "B", "C♯", "D", "E"],
  },
  {
    key: "C♯",
    type: "natural minor",
    notes: ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"],
  },
  {
    key: "G♯",
    type: "natural minor",
    notes: ["G♯", "A♯", "B", "C♯", "D♯", "E", "F♯"],
  },
  {
    key: "A♭",
    type: "natural minor",
    notes: ["A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭"],
  },
  {
    key: "D♯",
    type: "natural minor",
    notes: ["D♯", "E♯", "F♯", "G♯", "A♯", "B", "C♯"],
  },
  {
    key: "E♭",
    type: "natural minor",
    notes: ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"],
  },
  {
    key: "A♯",
    type: "natural minor",
    notes: ["A♯", "B♯", "C♯", "D♯", "E♯", "F♯", "G♯"],
  },
  {
    key: "B♭",
    type: "natural minor",
    notes: ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
  },
  {
    key: "F",
    type: "natural minor",
    notes: ["F", "G", "A♭", "B♭", "C", "D♭", "E♭"],
  },
  {
    key: "C",
    type: "natural minor",
    notes: ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
  },
  {
    key: "G",
    type: "natural minor",
    notes: ["G", "A", "B♭", "C", "D", "E♭", "F"],
  },
  {
    key: "D",
    type: "natural minor",
    notes: ["D", "E", "F", "G", "A", "B♭", "C"],
  },
]

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

export type Interval =
  | "minor 2nd"
  | "major 2nd"
  | "minor 3rd"
  | "major 3rd"
  | "perfect 4th"
  | "tritone"
  | "augmented 4th"
  | "diminished 5th"
  | "perfect 5th"
  | "minor 6th"
  | "augmented 5th"
  | "major 6th"
  | "minor 7th"
  | "augmented 6th"
  | "major 7th"

export const INTERVALS: Interval[] = [
  "minor 2nd",
  "major 2nd",
  "minor 3rd",
  "major 3rd",
  "perfect 4th",
  "tritone",
  "augmented 4th",
  "diminished 5th",
  "perfect 5th",
  "minor 6th",
  "augmented 5th",
  "major 6th",
  "minor 7th",
  "augmented 6th",
  "major 7th",
]
