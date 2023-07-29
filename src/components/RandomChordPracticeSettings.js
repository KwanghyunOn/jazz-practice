import { useState } from "react";

function TempoSlider({ bpm, setBpm }) {
  const minBpm = 30;
  const maxBpm = 200;
  const [sliderValue, setSliderValue] = useState(bpm);

  const handleChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleMouseUp = (e) => {
    setBpm(e.target.value);
  };

  return (
    <>
      <div class="flex flex-row justify-between items-center">
        <p class="text-xl font-semibold">Tempo</p>
        <p class="text-xl">{sliderValue} bpm</p>
      </div>
      <input
        type="range"
        min={minBpm}
        max={maxBpm}
        value={sliderValue}
        class="w-full h-3 bg-indigo-400 rounded-full appearance-none cursor-pointer"
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

function RootSettings({ roots, setRoots }) {
  return (
    <div>
      <p class="pb-2 text-xl font-semibold">Roots</p>
      <div>
        {roots.map((root) => (
          <button
            class={`w-16 px-2 py-2 m-0.5 text-lg font-semibold rounded-md 
            ${
              root.isActive
                ? "text-slate-100 bg-indigo-400 hover:bg-indigo-600"
                : "text-slate-50 bg-indigo-200 hover:bg-indigo-500"
            }`}
            onClick={(e) => {
              setRoots(
                roots.map((root) => {
                  if (root.name === e.target.name) {
                    return {
                      ...root,
                      isActive: !root.isActive,
                    };
                  } else {
                    return root;
                  }
                })
              );
            }}
            name={root.name}
          >
            {root.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckBox({ name, label, checked, onChange, size }) {
  let inputSize, svgSize, labelSize;
  switch (size) {
    case "sm":
      inputSize = "h-4 w-4";
      svgSize = "ml-[0.1rem] h-3 w-3";
      labelSize = "pl-1 text-md";
      break;
    case "md":
      inputSize = "h-5 w-5";
      svgSize = "ml-[0.125rem] h-[0.9375rem] w-[0.9375rem]";
      labelSize = "pl-[0.3125rem] text-lg";
      break;
    default: // md
      inputSize = "h-5 w-5";
      svgSize = "ml-[0.125rem] h-[0.9375rem] w-[0.9375rem]";
      labelSize = "pl-[0.3125rem] text-lg";
      break;
  }
  return (
    <div class="flex flex-row justify-start items-center px-1 py-0.5 hover:bg-slate-100 rounded-md">
      <input
        class={`shrink-0 relative peer ${inputSize} border-[0.1rem] border-slate-400 appearance-none outline-none rounded-sm
        checked:bg-indigo-700 checked:border-indigo-700`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        id={name}
      />
      <label
        class={`grow ${labelSize} hover:cursor-pointer select-none`}
        for={name}
      >
        {label}
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class={`absolute hidden peer-checked:block pointer-events-none ${svgSize} stroke-white stroke-2`}
      >
        <path
          fillRule="evenodd"
          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function ChordSettings({ chordTypes, setChordTypes }) {
  const triads = chordTypes.filter((chordType) => chordType.class === "triad");
  const sevenths = chordTypes.filter(
    (chordType) => chordType.class === "seventh"
  );

  return (
    <div>
      <p class="pb-2 text-xl font-semibold">Chords</p>
      <div class="grid grid-cols-2">
        <div>
          <CheckBox
            size="md"
            name="triads"
            label="Triads"
            checked={triads
              .map((chordType) => chordType.isActive)
              .reduce((acc, val) => acc && val, true)}
            onChange={(e) => {
              setChordTypes(
                chordTypes.map((chordType) => {
                  if (chordType.class === "triad") {
                    return {
                      ...chordType,
                      isActive: e.target.checked,
                    };
                  } else {
                    return chordType;
                  }
                })
              );
            }}
          />
          <div class="flex flex-col ml-2">
            {triads.map((chordType) => (
              <CheckBox
                size="sm"
                name={chordType.name}
                label={chordType.label}
                checked={chordType.isActive}
                onChange={(e) => {
                  console.log("Click!");
                  setChordTypes(
                    chordTypes.map((chordType) => {
                      if (chordType.name === e.target.name) {
                        return {
                          ...chordType,
                          isActive: e.target.checked,
                        };
                      } else {
                        return chordType;
                      }
                    })
                  );
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <CheckBox
            size="md"
            name="seventh"
            label="7th Chords"
            checked={sevenths
              .map((chordType) => chordType.isActive)
              .reduce((acc, val) => acc && val, true)}
            onChange={(e) => {
              setChordTypes(
                chordTypes.map((chordType) => {
                  if (chordType.class === "seventh") {
                    return {
                      ...chordType,
                      isActive: e.target.checked,
                    };
                  } else {
                    return chordType;
                  }
                })
              );
            }}
          />
          <div class="flex flex-col ml-2">
            {sevenths.map((chordType) => (
              <CheckBox
                size="sm"
                name={chordType.name}
                label={chordType.label}
                checked={chordType.isActive}
                onChange={(e) => {
                  setChordTypes(
                    chordTypes.map((chordType) => {
                      if (chordType.name === e.target.name) {
                        return {
                          ...chordType,
                          isActive: e.target.checked,
                        };
                      } else {
                        return chordType;
                      }
                    })
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemWrapper({ children }) {
  return <div class="p-4 rounded-md bg-white shadow-sm">{children}</div>;
}

export default function RandomChordPracticeSettings({
  roots,
  setRoots,
  chordTypes,
  setChordTypes,
  bpm,
  setBpm,
}) {
  return (
    <div class="w-full max-w-xl flex flex-col gap-y-2">
      <p class="py-2 text-2xl font-semibold">Settings</p>
      <ItemWrapper>
        <TempoSlider bpm={bpm} setBpm={setBpm} />
      </ItemWrapper>
      <ItemWrapper>
        <RootSettings roots={roots} setRoots={setRoots} />
      </ItemWrapper>
      <ItemWrapper>
        <ChordSettings chordTypes={chordTypes} setChordTypes={setChordTypes} />
      </ItemWrapper>
    </div>
  );
}
