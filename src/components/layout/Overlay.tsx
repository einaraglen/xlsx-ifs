import { Transition } from "@headlessui/react";
import { HiMiniXMark } from "react-icons/hi2";
import { useAppContext } from "../../services/context";
import Filter from "./tabs/Filter";
import { useState } from "react";
import Multiply from "./tabs/Multiply";
import Insert from "./tabs/Insert";
import { classNames } from "../../services/tools";

const Overlay = () => {
  const { overlay, setOverlay } = useAppContext();
  const [tab, setTab] = useState("filter")

  return (
    <Transition
      show={overlay}
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      enter="transition-all duration-200"
      leave="transition-all duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
      //@ts-ignore
      className="absolute inset-0 backdrop-blur-sm bg-zinc-900/50 z-20 flex items-center justify-center"
    >
      <div className="flex">
        <button onClick={() => setOverlay(false)} className="absolute top-24 right-10 group bg-zinc-950/50 rounded-full ring-1 ring-inset ring-white/20">
          <HiMiniXMark className="h-10 w-10 text-violet-400 group-hover:text-violet-200 transition-all duration-150" />
        </button>
        <div className="flex flex-col bg-zinc-800 shadow-xl rounded-xl h-44 w-96 overflow-hidden ring-1 ring-white/10 ring-inset">
          <div className="border-b border-white/15 grid grid-cols-3 text-sm">
            <button onClick={() => setTab("filter")} className={classNames(tab == "filter" && "bg-zinc-900/50", "w-full flex items-center justify-center py-2 border-r border-white/15 hover:bg-zinc-900/80")}>
              <span>Filter</span>
            </button>
            <button onClick={() => setTab("multiply")} className={classNames(tab == "multiply" && "bg-zinc-900/50", "w-full flex items-center justify-center py-2 border-r border-white/15 hover:bg-zinc-900/80")}>
              <span>Multiply</span>
            </button>
            <button onClick={() => setTab("insert")} className={classNames(tab == "insert" && "bg-zinc-900/50", "w-full flex items-center justify-center py-2 hover:bg-zinc-900/80")}>
              <span>Insert</span>
            </button>
          </div>
          <div className="pt-3 space-y-3">
           {tab == "filter" && <Filter />}
           {tab == "multiply" && <Multiply />}
           {tab == "insert" && <Insert />}
          </div>
        </div>
      </div>
    </Transition>
  );
};
export default Overlay;
