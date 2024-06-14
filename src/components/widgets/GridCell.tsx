import { useAppContext } from "@services/context";
import { classNames } from "@services/tools";
import { Fragment } from "react/jsx-runtime";

const Dot = ({ className }: { className?: string }) => {
  return (
    <div className={classNames(className, "relative h-2 w-2")}>
      <span className="bg-violet-600 animate-ping h-2 w-2 rounded-full p-1 absolute" />
      <span className="bg-violet-600 h-2 w-2 rounded-full p-1 absolute" />
    </div>
  );
};

interface Props {
  columnIndex: number;
  rowIndex: number;
  style: any;
}

const GridCell = ({ columnIndex, rowIndex, style }: Props) => {
  const { filters, filter, setOverlay, setHeader, data, multipliers, inserts } = useAppContext();

  const onHeaderSelection = (index: number, header: string) => {
    setOverlay(true);
    setHeader({ index, header });
  };

  if (!data) {
    return null;
  }

  const header = data.keys[columnIndex] || "BLANK";
  const disabled = rowIndex != 0 && filter[rowIndex - 1];
  const row_data = rowIndex != 0 && data.rows[rowIndex - 1][columnIndex];
  const multiplier = multipliers && multipliers[header];
  const insert = inserts && inserts[header];

  const isUsed = (filters && filters[header] != null) || multiplier != null || insert != null;

  const getRowContent = () => {
    let content: string | number | null = null;

    if (row_data) {
      content = row_data;
    }

    if (multiplier && content != null && !isNaN(Number(content))) {
      content = multiplier * (content as number);
    }

    if (insert) {
      content = insert + (content || "");
    }

    return content;
  };

  if (rowIndex == 0) {
    return (
      <button
        onClick={() => onHeaderSelection(columnIndex, header)}
        className=" bg-zinc-900/80 text-left hover:bg-zinc-950 transition-colors group duration-100 pl-2 font-medium shadow-md border-b border-r border-white/10"
        style={style}
      >
        <div className="w-full h-full relative  flex items-center">
          {isUsed && (
            <Fragment>
              <div className="absolute opacity-0 group-hover:opacity-100 group-hover:left-[1rem] left-[2.7rem] -bottom-[0.25rem] transition-all duration-200">
                <Dot />
              </div>
              <div className="absolute left-[2.7rem] -bottom-[0.25rem]">
                <Dot />
              </div>
              <div className="absolute opacity-0 group-hover:opacity-100 group-hover:left-[4.4rem] left-[2.7rem] -bottom-[0.25rem] transition-all duration-200">
                <Dot />
              </div>
            </Fragment>
          )}

          <div className="w-[95%] truncate">{header}</div>
        </div>
      </button>
    );
  } else {
    return (
      <div className={classNames(disabled && "bg-rose-400/10", "flex items-center pl-2 border-b border-r border-white/10 relative")} style={style}>
        <div className={classNames(disabled && "opacity-50", "w-[95%] truncate")}>
          {getRowContent() ? <span>{getRowContent()}</span> : <span className="text-zinc-500 italic">Auto</span>}
        </div>
      </div>
    );
  }
};

export default GridCell;
