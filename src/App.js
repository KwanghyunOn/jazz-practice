import Navbar from "./components/Navbar";
import RandomChordPractice from "./components/RandomChordPractice";

function App() {
  return (
    <div class="flex flex-col h-[100dvh]">
      <div class="grow-0 shrink-1 basis-auto">
        <Navbar />
      </div>
      <div class="grow-1 shrink-1 basis-auto h-full bg-neutral-100 overscroll-contain">
        <RandomChordPractice />
      </div>
    </div>
  );
}
export default App;
