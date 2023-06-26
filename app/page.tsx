import Image from "next/image";
import BrickSlider from "./components/game";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-between p-8 md:p-20 xl:p-24 bg-slate-800">
      <div className="items-center bg-blue-300 h-full aspect-[4/5] max-w-full border-8 rounded-2xl border-black">
        <BrickSlider />
      </div>
    </main>
  );
}
