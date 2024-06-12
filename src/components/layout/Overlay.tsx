import { Transition } from "@headlessui/react";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../widgets/Button";
import { HiMiniXMark, HiOutlineFunnel } from "react-icons/hi2";
import { useAppContext } from "../../services/context";

interface Props {
  open: boolean;
  setOpen: any;
  data: any
  header: { index: number; header: string } | null;
}

const Overlay = (props: Props) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<any>([]);
  const { parts, setFilter, filters } = useAppContext();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onFilter = () => {
    if (props.header != null) {
      const indexes = data.reduce<number[]>((res, curr, index) => {

        if (!(curr || "").toString().startsWith(query)) {
          res.push(index)
        }

        return res;
      }, [])

      setFilter(props.header.header, query, indexes)
      props.setOpen(false)
    }
  }

  useEffect(() => {
    if (query.trim().length == 0) {
      setFiltered(data)
    } else {
      const filteredRows = data.filter((field: string) => (field || "").toString().startsWith(query));
      setFiltered(filteredRows)
    }
  }, [query])

  useEffect(() => {
    if (props.open == true) {
      setQuery("")
      setData([])
      setFiltered([])
    }
  }, [props.open])

  useEffect(() => {
    if (parts == null || props.header == null) {
      return;
    }

    if (filters[props.header.header] != null) {
      setQuery(filters[props.header.header].filter || "")
    }

    const matches: string[] = [];

    for (const row of props.data.rows) {
      matches.push(row[props.header.index])
    }

    setData(matches)
  }, [props.data, props.header])

  return (
    <Transition
      show={props.open}
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      enter="transition-all duration-200"
      leave="transition-all duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
      //@ts-ignore
      className={"absolute inset-0 backdrop-blur-sm bg-zinc-900/50 z-20 flex items-center justify-center"}
    >
      <div className="flex">
        <button onClick={() => props.setOpen(false)} className="absolute top-24 right-10 group bg-zinc-950/50 rounded-full ring-1 ring-inset ring-white/20">
        <HiMiniXMark className="h-10 w-10 text-violet-400 group-hover:text-violet-200 transition-all duration-150" />
        </button>
        <div className="flex flex-col space-y-3 bg-zinc-800 shadow-xl p-5 rounded-xl ring-1 ring-white/10 ring-inset">
          <div className="flex space-x-2">
            <span className="font-medium w-44 truncate">{props.header?.header}</span>
          </div>
          <div className="flex space-x-2">
            <input
              value={query}
              onChange={onChange}
              placeholder="Starts with..."
              className="rounded-lg bg-zinc-900/80 focus:ring-white/40 ring-1 ring-white/20 ring-inset py-2 px-5 text-sm outline-none focus:outline-none transition-all duration-150"
            />
            <Button onClick={onFilter} className="flex items-center space-x-2 text-sm">
              <span>Filter</span>
              <HiOutlineFunnel className="h-5 min-w-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-end">
          <span className="text-xs text-zinc-400 italic">Matching {filtered.length == data.length ? "All" : filtered.length} rows</span>
          </div>
        </div>
      </div>
    </Transition>
  );
};
export default Overlay;
