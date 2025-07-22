import Image from "next/image";

import { AlignmentComponent } from "./alignment";
export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen pb-20">
      <main className="">
        <AlignmentComponent />
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <span className="flex items-center gap-2 pt-16">
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Semantic Alignment App
        </span>
      </footer>
    </div>
  );
}
