import { createContext, useContext, useState, type ReactNode } from "react";

type AppContext = {
  structure: { code: any[]; field: any[] }[] | null;
  parts: string[][] | null;
  selected: Record<string, string> | null;
  formatted: any[];
  setStructure: React.Dispatch<React.SetStateAction<{ code: any[]; field: any[] }[] | null>>;
  setParts: React.Dispatch<React.SetStateAction<string[][] | null>>;
  setSelected: React.Dispatch<React.SetStateAction<Record<string, string> | null>>;
  setFormatted: React.Dispatch<React.SetStateAction<any[]>>;
  reset: () => void;
  status: (key: string) => boolean;
  addSelection: (header: string, key: string) => void;
  deleteSelection: (header: string) => void;
};

const Context = createContext<AppContext>(null as any);
const useAppContext = () => useContext(Context);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [structure, setStructure] = useState<{ code: any[]; field: any[] }[] | null>(null);
  const [parts, setParts] = useState<string[][] | null>(null);
  const [selected, setSelected] = useState<Record<string, string> | null>(null);
  const [formatted, setFormatted] = useState<any>(null);

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
    let tmp = selected ? { ...selected } : {}

    tmp[header] = key;

    setSelected(tmp);
  };

  const deleteSelection = (header: string) => {
    let tmp = selected ? { ...selected } : null

    if (tmp == null) {
      return;
    }

    delete tmp[header];

    if (Object.keys(tmp).length == 0) {
      tmp = null
    }

    setSelected(tmp);
  };

  return (
    <Context.Provider
      value={{
        structure,
        parts,
        selected,
        formatted,
        setStructure,
        setParts,
        setSelected,
        setFormatted,
        reset,
        status,
        addSelection,
        deleteSelection,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppProvider, useAppContext };
