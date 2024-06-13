import { Transition } from "@headlessui/react";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../widgets/Button";
import { HiMiniXMark, HiOutlineFunnel } from "react-icons/hi2";
import { useAppContext } from "../../services/context";
import useAppHandler from "../../services/handler";

const Overlay = () => {
  const [query, setQuery] = useState("");
    const [memory, setMemory] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<any>([]);
  const { parts, filters, header, overlay, data, setOverlay } = useAppContext();
  const { setFilter } = useAppHandler();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onFilter = () => {
    if (header != null) {
      setFilter(header.header, query)
      setOverlay(false)
    }
  }

  useEffect(() => {
    if (query.trim().length == 0) {
      setFiltered(memory)
    } else {
      const filteredRows = memory.filter((field: string) => field && field.toString().startsWith(query));
      setFiltered(filteredRows)
    }
  }, [query, memory, header])

  useEffect(() => {
    if (!parts || !header || !data) {
      return;
    }

    if (filters && filters[header.header] != null) {
      setQuery(filters[header.header] || "")
    } else {
      setQuery("")
    }

    const matches: any[] = [];

    for (const row of data.rows) {
      matches.push(row[header.index])
    }

    setMemory(matches)
    setFiltered(matches)
  }, [data, header])

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
        <div className="flex flex-col space-y-3 bg-zinc-800 shadow-xl p-5 rounded-xl ring-1 ring-white/10 ring-inset">
          <div className="flex space-x-2">
            <span className="font-medium w-44 truncate">{header?.header}</span>
          </div>
          <div className="flex space-x-2">
            <input
              value={query}
              onChange={onChange}
              placeholder="Starts with..."
              className="rounded-lg bg-zinc-900/80 focus:ring-white/40 ring-1 ring-white/20 ring-inset py-2 px-5 text-sm outline-none shadow-lg focus:outline-none transition-all duration-150"
            />
            <Button onClick={onFilter} className="flex items-center space-x-2 text-sm">
              <span>Apply</span>
              <HiOutlineFunnel className="h-5 min-w-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-end">
          <span className="text-xs text-zinc-400 italic">Matching {filtered.length == memory.length ? "All" : filtered.length} rows</span>
          </div>
        </div>
      </div>
    </Transition>
  );
};
export default Overlay;
