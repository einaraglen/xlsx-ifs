import { MessageBoxOptions } from "electron"
import { ExportArguments, IFS_Structure, PrepareArguments } from "../../electron/lib/parser"

const useInvoke = () => {
    const readClipboard = (clipboard: string): Promise<{metadata: string[], structure: IFS_Structure[] }> => {
        return window.ipcRenderer.invoke("read-clipboard", clipboard)
    }

    const readFile = (path: string): Promise<string[][]> => {
        return window.ipcRenderer.invoke("read-file", path)
    }

    const showDialog = (options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue> => {
        return window.ipcRenderer.invoke("show-dialog", options)
    }

    const exportData = (args: ExportArguments) => {
        return window.ipcRenderer.invoke("export-data", args)
    }

    const prepareClipboard = (args: PrepareArguments) => {
        return window.ipcRenderer.invoke("export-data", args)
    }

    return { readClipboard, readFile, showDialog, exportData, prepareClipboard }
}

export default useInvoke;

