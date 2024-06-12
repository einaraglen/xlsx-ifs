import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Button from "../components/widgets/Button";
import { useEffect, useState, memo, useMemo, Fragment } from "react";
import { useAppContext } from "../services/context";
import useInvoke from "../services/invoke";
import { FixedSizeGrid as Grid } from "react-window";
import Overlay from "../components/layout/Overlay";
import GridCell from "../components/widgets/GridCell";
import { FadeDelay, FadeDrop } from "../components/layout/Animations";
import { getFilter } from "../services/tools";

const Export = () => {
  const { structure, parts, selected, filters, metadata } = useAppContext();
  const { exportData, prepareClipboard } = useInvoke();
  const [data, setData] = useState<{ keys: string[]; rows: (string | number | null)[][] }>({ keys: [], rows: [] });
  const [header, setHeader] = useState<{ index: number; header: string } | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const filter = useMemo(() => getFilter(filters), [filters]);

  useEffect(() => {
    if (!structure || !parts || !selected) {
      return;
    }

    const fetch = async () => {
      const res = await exportData({ structure, parts, selected });
      setData(res);
    };

    fetch();
  }, [structure, parts, selected]);

  const onCopy = async () => {
    if (!structure || !metadata) {
      return;
    }

    const response = await prepareClipboard({ structure, metadata, filter, data });
    await navigator.clipboard.writeText(response);
  };

  const onHeaderSelection = (index: number, header: string) => {
    setOpen(true);
    setHeader({ index, header });
  };

  const Cell = memo(({ columnIndex, rowIndex, style }: any) => <GridCell {...{ filters, filter, data, onHeaderSelection, columnIndex, rowIndex, style }} />);

  return (
    <Fragment>
      <FadeDrop className="h-[12%] border-b border-white/10 flex items-center justify-between relative px-10">
        <span className="font-medium">Export Preview</span>
        <Button onClick={onCopy} disabled={!structure || !parts || !selected} className="flex items-center space-x-2 text-sm w-32">
          <span>Copy</span>
          <HiOutlineClipboardDocumentList className="h-5 w-5" />
        </Button>
      </FadeDrop>
      <FadeDelay>
        {data.keys && data.rows && (
          <Grid className="corner text-xs" columnCount={data.keys.length} columnWidth={120} height={425} rowCount={data.rows.length + 1} rowHeight={35} width={1010}>
            {Cell}
          </Grid>
        )}
      </FadeDelay>
      <Overlay {...{ header, data, open, setOpen }} />
    </Fragment>
  );
};

export default Export;
