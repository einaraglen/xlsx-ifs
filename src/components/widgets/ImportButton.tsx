import { useNavigate } from "react-router-dom";
import useInvoke from "@services/invoke";
import { useAppContext } from "@services/context";
import Button from "./Button";
import { HiOutlineClipboardDocumentList  } from "react-icons/hi2";
import useAppHandler from "@services/handler";

const ImportButton = () => {
  let navigate = useNavigate();
  const { setStructure, setMetadata } = useAppContext();
  const { onStructureImport } = useAppHandler();
  const { readClipboard, showDialog } = useInvoke();

  const onImport = async () => {
    try {
      const clipboard = await navigator.clipboard.readText();
      const { metadata, structure } = await readClipboard(clipboard);

      setStructure(structure);
      setMetadata(metadata)

      onStructureImport();

      navigate("/import");
    } catch (err: any) {
      return await showDialog({
        type: "error",
        title: "Clipboard Error",
        message: err.toString().replace("Error: Error invoking remote method 'read-clipboard':", ""),
        buttons: ["OK"],
      });
    }
  };
  return (
    <Button onClick={onImport} className="flex items-center space-x-2 w-52 py-2 px-5">
      <span>Import Structure</span>
      <HiOutlineClipboardDocumentList  className="h-5 w-5" />
    </Button>
  );
};

export default ImportButton;
