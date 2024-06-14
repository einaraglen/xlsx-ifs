import { useRef, useState } from "react";
import useInvoke from "../../services/invoke";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../services/context";
import Button from "./Button";
import { HiOutlineInboxArrowDown  } from "react-icons/hi2";
import { classNames } from "../../services/tools";
import useAppHandler from "../../services/handler";

const getFilePath = (e: React.DragEvent<HTMLDivElement>) => {
  if (e.dataTransfer.items) {
    const items = [...e.dataTransfer.items];

    if (items.length > 1) {
      throw new Error("Cannot import more mutiple files at once");
    }

    const file = items[0].getAsFile();

    if (!file?.name.includes(".xlsx")) {
      throw new Error("File has to be .xlsx format");
    }

    return file.path;
  } else {
    throw new Error("No files found in drop");
  }
};

const FileDrop = () => {
  const { setParts } = useAppContext();
  const { onFileImport } = useAppHandler();
  let navigate = useNavigate();
  const { readFile, showDialog } = useInvoke();
  const [isDrag, setIsDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  let dragLeaveTimer: any;

  const handleDragOver = (event: any) => {
    event.preventDefault();
    if (!isDrag) {
      setIsDrag(true);
    }
    clearTimeout(dragLeaveTimer);
  };

  const handleDragLeave = () => {
    dragLeaveTimer = setTimeout(() => {
      setIsDrag(false);
    }, 100);
  };
  const onFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const path = getFilePath(e);
      const res = await readFile(path);
      setParts(res);

      onFileImport()

      navigate("/select");
    } catch (err: any) {
      setIsDrag(false);
      return await showDialog({
        type: "error",
        title: "Import Error",
        message: err.toString().replace("Error: Error invoking remote method 'read-file':", ""),
        buttons: ["OK"],
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.item(0)

      if (!file?.name.includes(".xlsx")) {
        throw new Error("File has to be .xlsx format");
      }

      const res = await readFile(file?.path!);
      setParts(res);
      
      onFileImport()

      navigate("/select");
    } catch (err: any) {
      return await showDialog({
        type: "error",
        title: "Import Error",
        message: err.toString().replace("Error: Error invoking remote method 'read-file':", ""),
        buttons: ["OK"],
      });
    }
  };

  const onImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative h-64 w-[35rem] flex items-center justify-center">
      <div
        className={classNames(isDrag ? "scale-105 ring-2 ring-violet-400 z-20" : "ring-1 ring-white/10 z-0", "bg-zinc-900/30 shadow-lg absolute inset-0 rounded-xl transition-all")}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={onFileDrop}
      />
      <Button onClick={onImportClick} className="flex items-center space-x-2 z-10 w-52 py-2 px-5">
        <span>Import File</span>
        <HiOutlineInboxArrowDown  className="h-5 w-5" />
      </Button>
      <input
        type="file"
        accept=".xlsx"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileDrop;
