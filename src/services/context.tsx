import { createContext, useContext, useState, type ReactNode } from "react";
import { IFS_Structure } from "../../electron/lib/parser";

type AppContext = {
  structure: IFS_Structure[] | null;
  parts: (string | number | null)[][] | null;
  selected: Record<string, string> | null;
  formatted: any[];
  filters: Record<string, { filter: string; indexes: number[] }>;
  metadata: string[] | null
  setStructure: React.Dispatch<React.SetStateAction<IFS_Structure[] | null>>;
  setParts: React.Dispatch<React.SetStateAction<(string | number | null)[][] | null>>;
  setSelected: React.Dispatch<React.SetStateAction<Record<string, string> | null>>;
  setFormatted: React.Dispatch<React.SetStateAction<any[]>>;
  reset: () => void;
  status: (key: string) => boolean;
  addSelection: (header: string, key: string) => void;
  deleteSelection: (header: string) => void;
  setFilter: (key: string, filter: string, indexes: number[]) => void;
  setMetadata: React.Dispatch<React.SetStateAction<any[] | null>>
};

const Context = createContext<AppContext>(null as any);
const useAppContext = () => useContext(Context);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [structure, setStructure] = useState<IFS_Structure[] | null>(null);
  const [parts, setParts] = useState<(string | number | null)[][] | null>(null);
  const [selected, setSelected] = useState<Record<string, string> | null>(null);
  const [formatted, setFormatted] = useState<any>(null);
  const [filters, setFilters] = useState<Record<string, { filter: string; indexes: number[] }>>({});
  const [metadata, setMetadata] = useState<string[] | null>(null);

  const reset = () => {
    setStructure(null);
    setParts(null);
    setSelected(null);
    setFormatted(null);
  };

  const status = (key: string) => {
    switch (key) {
      case "/":
        return structure != null;
      case "/import":
        return parts != null;
      case "/select":
        return selected != null;
      default:
        return false;
    }
  };

  const addSelection = (header: string, key: string) => {
    let tmp = selected ? { ...selected } : {};

    tmp[header] = key;

    setSelected(tmp);
  };

  const deleteSelection = (header: string) => {
    let tmp = selected ? { ...selected } : null;

    if (tmp == null) {
      return;
    }

    delete tmp[header];

    if (Object.keys(tmp).length == 0) {
      tmp = null;
    }

    setSelected(tmp);
  };

  const setFilter = (key: string, filter: string, indexes: number[]) => {
    const tmp = { ...filters };

    if (filter.trim().length == 0) {
      delete tmp[key];
    } else {
      tmp[key] = { filter, indexes };
    }

    setFilters(tmp);
  };

  return (
    <Context.Provider
      value={{
        structure,
        parts,
        selected,
        formatted,
        filters,
        metadata,
        setStructure,
        setParts,
        setSelected,
        setFormatted,
        reset,
        status,
        addSelection,
        deleteSelection,
        setFilter,
        setMetadata
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppProvider, useAppContext };
