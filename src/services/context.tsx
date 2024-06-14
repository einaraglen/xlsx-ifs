import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Structure, Row, Metadata, Selected, Filters, Export, Header, Filter, Multipliers, Inserts } from "../../electron/lib/methods";
import { getFilter } from "./tools";

type AppContext = {
  structure: Structure[] | null;
  parts: Row[] | null;
  selected: Selected | null;
  filters: Filters | null;
  multipliers: Multipliers | null;
  inserts: Inserts | null;
  metadata: Metadata | null;
  data: Export | null;
  header: Header | null;
  overlay: boolean;
  filter: Filter;
  groupBy: string | null;
  setStructure: React.Dispatch<React.SetStateAction<Structure[] | null>>;
  setParts: React.Dispatch<React.SetStateAction<Row[] | null>>;
  setSelected: React.Dispatch<React.SetStateAction<Selected | null>>;
  setMetadata: React.Dispatch<React.SetStateAction<Metadata | null>>;
  setFilters: React.Dispatch<React.SetStateAction<Filters | null>>;
  setData: React.Dispatch<React.SetStateAction<Export | null>>;
  setHeader: React.Dispatch<React.SetStateAction<Header | null>>;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupBy: React.Dispatch<React.SetStateAction<string | null>>;
  setMultipliers: React.Dispatch<React.SetStateAction<Multipliers | null>>;
  setInserts: React.Dispatch<React.SetStateAction<Inserts | null>>;
};

const Context = createContext<AppContext>(null as any);
const useAppContext = () => useContext(Context);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [structure, setStructure] = useState<Structure[] | null>(null);
  const [parts, setParts] = useState<Row[] | null>(null);
  const [selected, setSelected] = useState<Selected | null>(null);
  const [filters, setFilters] = useState<Filters | null>(null);
  const [multipliers, setMultipliers] = useState<Multipliers | null>(null);
  const [inserts, setInserts] = useState<Inserts | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [data, setData] = useState<Export | null>(null);
  const [header, setHeader] = useState<Header | null>(null);
  const [overlay, setOverlay] = useState<boolean>(false);
  const [groupBy, setGroupBy] = useState<string | null>(null);

  const filter = useMemo(() => getFilter(data, filters), [data, filters]);

  return (
    <Context.Provider
      value={{
        structure,
        parts,
        selected,
        filters,
        multipliers,
        inserts,
        metadata,
        data,
        header,
        overlay,
        filter,
        groupBy,
        setStructure,
        setParts,
        setSelected,
        setMetadata,
        setFilters,
        setData,
        setHeader,
        setOverlay,
        setGroupBy,
        setMultipliers,
        setInserts
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppProvider, useAppContext };
