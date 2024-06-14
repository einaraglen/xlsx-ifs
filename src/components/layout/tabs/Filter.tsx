import { Fragment } from "react/jsx-runtime";
import { useAppContext } from "@services/context";
import { ChangeEvent, useEffect, useState } from "react";
import useAppHandler from "@services/handler";
import Button from "@widgets/Button";
import { HiOutlineFunnel } from "react-icons/hi2";

const Filter = () => {
  const [query, setQuery] = useState("");
  const [memory, setMemory] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<any>([]);
  const { parts, filters, header, data, setOverlay } = useAppContext();
  const { setFilter } = useAppHandler();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onFilter = () => {
    if (header != null) {
      setFilter(header.header, query);
      setOverlay(false);
    }
  };

  useEffect(() => {
    if (query.trim().length == 0) {
      setFiltered(memory);
    } else {
      const filteredRows = memory.filter((field: string) => field && field.toString().startsWith(query));
      setFiltered(filteredRows);
    }
  }, [query, memory, header]);

  useEffect(() => {
    if (!parts || !header || !data) {
      return;
    }

    if (filters && filters[header.header] != null) {
      setQuery(filters[header.header] || "");
    } else {
      setQuery("");
    }

    const matches: any[] = [];

    for (const row of data.rows) {
      matches.push(row[header.index]);
    }

    setMemory(matches);
    setFiltered(matches);
  }, [data, header]);

  return (
    <Fragment>
      <div className="flex space-x-2 px-5">
        <span className="font-medium w-44 truncate">{header?.header}</span>
      </div>
      <div className="flex space-x-2 px-5">
        <input
          value={query}
          onChange={onChange}
          placeholder="Starts with..."
          className="rounded-lg w-full bg-zinc-900/80 focus:ring-white/40 ring-1 ring-white/20 ring-inset py-2 px-5 text-sm outline-none shadow-lg focus:outline-none transition-all duration-150"
        />
        <Button onClick={onFilter} className="flex items-center justify-between text-sm w-36 px-2">
          <span>Filter</span>
          <HiOutlineFunnel className="h-5 min-w-5 w-5" />
        </Button>
      </div>
      <div className="flex justify-end px-5">
        <span className="text-xs text-zinc-400 italic">Matching {filtered.length == memory.length ? "All" : filtered.length} rows</span>
      </div>
    </Fragment>
  );
};

export default Filter;
