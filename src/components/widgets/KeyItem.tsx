import { useDroppable } from "@dnd-kit/core";
import { classNames } from "../../services/tools";
import { Fragment } from "react/jsx-runtime";
import { HiLink, HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { useAppContext } from "../../services/context";
import { HiOutlineXCircle } from "react-icons/hi2";
import Toggle from "./Toggle";
import useAppHandler from "../../services/handler";

interface Props {
  data: string;
}

const KeyZone = (props: Props) => {
  const { selected, groupBy } = useAppContext();
  const { deleteSelection, setGroupBy } = useAppHandler();
  const { isOver, setNodeRef } = useDroppable({
    id: props.data,
  });

  return (
    <Fragment>
      <div
        ref={setNodeRef}
        className={classNames(
          isOver ? "scale-105 ring-violet-400" : "ring-white/10",
          "w-52 h-8 bg-zinc-900/30 ring-1 rounded-full ring-inset transition-all shadow-lg flex items-center justify-between px-3"
        )}
      >
        <div className="w-32 truncate text-xs">{selected && selected[props.data]}</div>
        {selected && selected[props.data] && (
          <button onClick={() => deleteSelection(props.data)} className="text-zinc-500 hover:text-rose-500 transition-all duration-200 h-full w-8 flex justify-end items-center">
            <HiOutlineXCircle className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-center w-full">
        <HiLink className={classNames(selected && selected[props.data] != null ? "opacity-100" : "opacity-0", "text-emerald-500 transition-all")} />
      </div>
      <div className={classNames((!selected || selected[props.data] == null) && "opacity-50", "flex transition-all duration-200 items-center text-xs bg-zinc-900/30 shadow-lg px-3 rounded-full ring-1 ring-inset ring-white/10")}>{props.data.length == 0 ? <span className="text-zinc-400 italic">Blank</span> : <div className="truncate font-medium">{props.data}</div>}</div>
      <div className="flex items-center justify-center w-full">
        <HiOutlineSquare3Stack3D className={classNames(groupBy != null && groupBy == props.data ? "opacity-100" : "opacity-0", "text-emerald-500 transition-all")} />
      </div>
      <Toggle disabled={(!selected || selected[props.data] == null) as boolean} value={groupBy != null && groupBy == props.data} setValue={() => setGroupBy(props.data)} />
    </Fragment>
  );
};

export default KeyZone;
