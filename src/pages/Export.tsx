import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Button from "../components/widgets/Button";
import { useEffect, memo, Fragment } from "react";
import { useAppContext } from "../services/context";
import useInvoke from "../services/invoke";
import { FixedSizeGrid as Grid } from "react-window";
import Overlay from "../components/layout/Overlay";
import GridCell from "../components/widgets/GridCell";
import { FadeDelay, FadeDrop } from "../components/layout/Animations";

const Export = () => {
  const { structure, parts, selected, metadata, filter, data, groupBy, setOverlay, setData } = useAppContext();
  const { exportData, prepareClipboard } = useInvoke();

  useEffect(() => {
    if (!structure || !parts || !selected) {
      return;
    }

    const fetch = async () => {
      const res = await exportData({ structure, parts, selected, groupBy });
      setData(res);
    };

    fetch();
  }, [structure, parts, selected]);

  useEffect(() => {
    () => setOverlay(false)
  }, [])

  const onCopy = async () => {
    if (!structure || !metadata || !data) {
      return;
    }

    const response = await prepareClipboard({ structure, metadata, filter, data });
    await navigator.clipboard.writeText(response);
  };

  const Cell = memo(({ columnIndex, rowIndex, style }: any) => <GridCell {...{ columnIndex, rowIndex, style }} />);

  return (
    <Fragment>
      <FadeDrop className="h-[12%] border-b border-white/10 flex items-center justify-between relative px-10">
        <span className="font-medium">Export Preview</span>
        <Button onClick={onCopy} disabled={!data} className="flex items-center space-x-2 text-sm w-32 py-2 px-5">
          <span>Copy</span>
          <HiOutlineClipboardDocumentList className="h-5 w-5" />
        </Button>
      </FadeDrop>
      <FadeDelay>
        {data && data.keys && data.rows && (
          <Grid className="corner text-xs" overscanColumnCount={4} overscanRowCount={4} columnCount={data.keys.length} columnWidth={120} height={425} rowCount={data.rows.length + 1} rowHeight={35} width={1010}>
            {Cell}
          </Grid>
        )}
      </FadeDelay>
      <Overlay />
    </Fragment>
  );
};

export default Export;
