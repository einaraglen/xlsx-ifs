import { useState } from "react";
import { useAppContext } from "../services/context";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import HeaderItem from "../components/widgets/HeaderItem";
import KeyItem from "../components/widgets/KeyItem";
import Button from "../components/widgets/Button";
import { HiOutlineForward } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { FadeDelay, FadeDrop } from "../components/layout/Animations";
import InnerScroll from "../components/layout/InnerScroll";
import useAppHandler from "../services/handler";

const Select = () => {
  const { structure, parts, selected } = useAppContext();
  const { addSelection } = useAppHandler()
  const [active, setActive] = useState<any>(null);
  let navigate = useNavigate();

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
      <FadeDrop className="h-[12%] border-b border-white/10 flex items-center justify-between px-10">
        <span className="font-medium">Select Fields to Connect</span>
        <Button onClick={() => navigate("/export")} disabled={!selected} className="flex items-center space-x-2 text-sm w-32 py-2 px-5">
          <span>Proceede</span>
          <HiOutlineForward className="h-5 min-w-5 w-5" />
        </Button>
      </FadeDrop>
      <FadeDelay className="w-full grid grid-cols-[1fr_2fr] h-[88%]">
        <InnerScroll>
          <div className="flex flex-col  space-y-4 py-3">
            <HeaderItem data="Default" hide={active == "Default"} />
            <div className="border-b border-white/10 w-full" />
            {parts && parts[0].map((header: any) => <HeaderItem key={header} data={header} hide={active == header} />)}
          </div>
        </InnerScroll>
        <InnerScroll>
          <div className="flex justify-end pr-3">
            <div className="grid grid-cols-[13rem_1.3rem_13rem_1.3rem_5rem] gap-y-4 gap-x-4 py-3">
              {structure && structure.map((item: any) => <KeyItem key={item.header} data={item.header} />)}
            </div>
          </div>
        </InnerScroll>
      </FadeDelay>
      <DragOverlay>
        <div className="w-44 flex justify-center items-center py-1.5 bg-violet-800 ring-1 ring-white/10 ring-inset shadow-lg rounded-full">
          <div className="w-32 truncate text-center text-xs">{active}</div>
        </div>
      </DragOverlay>
    </DndContext>
  );
};

export default Select;
