import { ChordType, Chord } from "@/types/music"

function renderChordType(chordType: ChordType) {
  switch (chordType) {
    case "major":
      return <span>Maj</span>
    case "minor":
      return <span>m</span>
    case "dim":
      return <span>dim</span>
    case "aug":
      return <span>aug</span>
    case "major7":
      return <span>Maj7</span>
    case "minor7":
      return <span>m7</span>
    case "dominant7":
      return <span>7</span>
    case "dim7":
      return <span>dim7</span>
    case "aug7":
      return <span>aug7</span>
    case "halfdim7":
      return (
        <span>
          m7<sup>♭5</sup>
        </span>
      )
  }
}

export default function ChordDisplay({
  chord,
  className,
}: {
  chord: Chord
  className?: string
}) {
  return (
    <div className={className}>
      <span>{chord.root}</span>
      {renderChordType(chord.type)}
    </div>
  )
}
