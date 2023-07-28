import { useState, useEffect, useRef, useCallback } from "react";
// import { experimental_useEffectEvent as useEffectEvent } from "react";
import RandomChordPracticeSettings from "./RandomChordPracticeSettings";
import BottomSheet from "./BottomSheet";

const ROOTS = [
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
  "A♭",
  "A",
  "B♭",
  "B",
].map((root) => {
  return {
    name: root,
    isActive: true,
    display: root,
    label: root,
  };
});

const CHORD_TYPES = [
  {
    name: "major",
    isActive: true,
    display: "Maj",
    label: "Major",
    class: "triad",
  },
  {
    name: "minor",
    isActive: true,
    display: "m",
    label: "Minor",
    class: "triad",
  },
  {
    name: "dim",
    isActive: true,
    display: "dim",
    label: "Diminished (°)",
    class: "triad",
  },
  {
    name: "aug",
    isActive: true,
    display: "aug",
    label: "Augmented (+)",
    class: "triad",
  },
  {
    name: "major7",
    isActive: true,
    display: "M7",
    label: "Major 7th",
    class: "seventh",
  },
  {
    name: "minor7",
    isActive: true,
    display: "m7",
    label: "Minor 7th",
    class: "seventh",
  },
  {
    name: "dominant7",
    isActive: true,
    display: "7",
    label: "Dominant 7th",
    class: "seventh",
  },
  {
    name: "dim7",
    isActive: true,
    display: "dim7",
    label: "Diminished 7th",
    class: "seventh",
  },
  {
    name: "halfdim7",
    isActive: true,
    display: "Ø",
    label: "Half-diminished (m7♭5, ø)",
    class: "seventh",
  },
];

function getRandomElement(array, defaultValue) {
  if (array.length === 0) return defaultValue;
  return array[Math.floor(Math.random() * array.length)];
}

function PlayButton({ isPlaying, onClick }) {
  const svgClass = "w-16 h-16 md:w-24 md:h-24 stroke-0 fill-slate-50";
  return (
    <button
      class="p-3 rounded-full bg-indigo-500 hover:bg-indigo-700 shadow-sm"
      onClick={onClick}
    >
      {isPlaying ? (
        <svg
          class={svgClass}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          class={svgClass}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19.376 12.4158L8.77735 19.4816C8.54759 19.6348 8.23715 19.5727 8.08397 19.3429C8.02922 19.2608 8 19.1643 8 19.0656V4.93408C8 4.65794 8.22386 4.43408 8.5 4.43408C8.59871 4.43408 8.69522 4.4633 8.77735 4.51806L19.376 11.5838C19.6057 11.737 19.6678 12.0474 19.5146 12.2772C19.478 12.3321 19.4309 12.3792 19.376 12.4158Z"></path>
        </svg>
      )}
    </button>
  );
}

export default function RandomChordPractice() {
  const [roots, setRoots] = useState(ROOTS);
  const [chordTypes, setChordTypes] = useState(CHORD_TYPES);
  const [isPlaying, setIsPlaying] = useState(false);
  const wasPlayingRef = useRef(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [bpm, setBpm] = useState(120);
  const delay = ((1000 * 60) / bpm) * 4;

  const handleSettingsOpen = (e) => {
    wasPlayingRef.current = isPlaying;
    setIsPlaying(false);
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = (e) => {
    setIsSettingsOpen(false);
    setIsPlaying(wasPlayingRef.current);
  };

  const getRandomChord = useCallback(() => {
    return (
      getRandomElement(
        roots.filter((root) => root.isActive).map((root) => root.display),
        ""
      ) +
      getRandomElement(
        chordTypes
          .filter((chordType) => chordType.isActive)
          .map((chordType) => chordType.display),
        ""
      )
    );
  }, [roots, chordTypes]);
  const [chords, setChords] = useState([getRandomChord(), getRandomChord()]);

  // const updateChords = useEffectEvent(() => {
  //   setChords((chords) => [...chords.slice(1), getRandomChord()]);
  // });
  useEffect(() => {
    const updateChords = () => {
      setChords((chords) => [...chords.slice(1), getRandomChord()]);
    };
    if (isPlaying) {
      const intervalId = setInterval(() => {
        updateChords();
      }, delay);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, delay, getRandomChord]);

  return (
    <div class="h-full px-6 flex flex-col justify-center items-center">
      <div class="basis-3/12 flex justify-center items-center">
        <p class="p-8 text-8xl md:text-9xl xl:text-10xl">{chords[0]}</p>
      </div>
      <div class="basis-1/12 pb-2 flex justify-center items-center">
        <p class="text-3xl md:text-4xl xl:text-5xl">Up Next...</p>
      </div>
      <div class="basis-1/12 flex justify-center items-center">
        <p class="text-6xl md:text-7xl xl:text-8xl">{chords[1]}</p>
      </div>
      <div class="basis-4/12 flex justify-center items-center">
        <PlayButton
          isPlaying={isPlaying}
          onClick={(e) => {
            setIsPlaying(!isPlaying);
          }}
        />
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <button
          class="max-w-md w-full p-3 md:p-4 text-white text-2xl md:text-3xl font-semibold bg-indigo-500 hover:bg-indigo-700 rounded-full"
          onClick={handleSettingsOpen}
        >
          Settings
        </button>
      </div>
      <BottomSheet open={isSettingsOpen} onClose={handleSettingsClose}>
        <RandomChordPracticeSettings
          roots={roots}
          setRoots={setRoots}
          chordTypes={chordTypes}
          setChordTypes={setChordTypes}
          bpm={bpm}
          setBpm={setBpm}
        />
      </BottomSheet>
    </div>
  );
}
