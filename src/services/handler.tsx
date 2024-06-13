import { useAppContext } from "./context";

const useAppHandler = () => {
  const context = useAppContext();

  const reset = () => {
    context.setStructure(null);
    context.setParts(null);
    context.setSelected(null);
  };

  const status = (key: string) => {
    switch (key) {
      case "/":
        return context.structure != null;
      case "/import":
        return context.parts != null;
      case "/select":
        return context.selected != null;
      default:
        return false;
    }
  };

  const addSelection = (header: string, key: string) => {
    let tmp = context.selected ? { ...context.selected } : {};

    tmp[header] = key;

    context.setSelected(tmp);
  };

  const deleteSelection = (header: string) => {
    let tmp = context.selected ? { ...context.selected } : null;

    if (context.groupBy == header) {
      context.setGroupBy(null)
    }

    if (!tmp) {
      return;
    }

    delete tmp[header];

    if (Object.keys(tmp).length == 0) {
      tmp = null;
    }

    context.setSelected(tmp);
  };

  const setFilter = (key: string, filter: string) => {
    const tmp = { ...context.filters };

    if (filter.trim().length == 0) {
      delete tmp[key];
    } else {
      tmp[key] = filter;
    }

    context.setFilters(tmp);
  };

  const setGroupBy = (str: string) => {
    context.setGroupBy((g) => str == g ? null : str)
  }

  const onStructureImport = () => {
    context.setGroupBy(null)
    context.setData(null)
    context.setFilters(null)
    context.setSelected(null)
    context.setParts(null)
  }

  const onFileImport = () => {
    context.setGroupBy(null)
    context.setData(null)
    context.setFilters(null)
    context.setSelected(null)
  }

  return { reset, status, addSelection, deleteSelection, setFilter, setGroupBy, onStructureImport, onFileImport }
};

export default useAppHandler;
