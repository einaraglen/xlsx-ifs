import { ReactNode, useMemo, useState } from "react";
import { useAppContext } from "../services/context";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import HeaderItem from "../components/widgets/HeaderItem";
import KeyItem from "../components/widgets/KeyItem";
import Button from "../components/widgets/Button";
import { HiOutlineForward } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const InnerScroll = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <div className="h-full overflow-y-scroll overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};

const Select = () => {
  const { structure, parts, addSelection, selected } = useAppContext();
  const [active, setActive] = useState<any>(null);
  let navigate = useNavigate();

  const keys = useMemo(() => {
    if (structure == null) {
      return;
    }

    return structure[0].field;
  }, [structure]);

  const headers = useMemo(() => {
    if (parts == null) {
      return;
    }

    return parts[0];
  }, [parts]);

  const onDragStart = (event: DragStartEvent) => {
    setActive(event.active.data.current?.header);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActive(null);
    if (event.over != null && active != null) {
      addSelection(event.over.id as string, active);
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="h-[12%] border-b border-white/10 flex items-center justify-between px-10">
        <span className="font-medium">Select Fields to Connect</span>
        <Button onClick={() => navigate("/export")} disabled={selected == null} className="flex items-center space-x-2 text-sm w-32">
          <span>Proceede</span>
          <HiOutlineForward className="h-5 min-w-5 w-5" />
        </Button>
      </div>
      <div className="w-full grid grid-cols-[1fr_2fr] h-[88%]">
        <InnerScroll>
          <div className="flex flex-col  space-y-4 py-3">
            <HeaderItem data="Default" hide={active == "Default"} />
            <div className="border-b border-white/10 w-full" />
            {headers && headers.map((header: any) => <HeaderItem key={header} data={header} hide={active == header} />)}
          </div>
        </InnerScroll>
        <InnerScroll>
          <div className="flex justify-center">
          <div className="grid grid-cols-[13rem_2rem_12rem] gap-y-4 py-3">{keys && keys.map((key: any, i: number) => <KeyItem key={key.content[0] + i} data={key.content[0]} />)}</div>

          </div>
        </InnerScroll>
      </div>
      <DragOverlay>
        <div className="w-44 flex justify-center items-center py-1.5 bg-violet-800 ring-1 ring-white/10 ring-inset shadow-lg rounded-full">
          <div className="w-32 truncate text-center text-xs">{active}</div>
        </div>
      </DragOverlay>
    </DndContext>
  );
};

export default Select;
