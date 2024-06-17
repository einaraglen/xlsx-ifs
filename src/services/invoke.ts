import { MessageBoxOptions } from "electron"
import { ExportArguments, Structure, PrepareArguments } from "@electron/lib/methods"

const useInvoke = () => {
    const readClipboard = (clipboard: string): Promise<{metadata: string[], structure: Structure[] }> => {
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
        return window.ipcRenderer.invoke("prepare-clipboard", args)
    }

    return { readClipboard, readFile, showDialog, exportData, prepareClipboard }
}

export default useInvoke;

