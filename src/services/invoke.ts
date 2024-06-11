import { MessageBoxOptions } from "electron"

const useInvoke = () => {
    const readClipboard = (clipboard: string) => {
        return window.ipcRenderer.invoke("read-clipboard", clipboard)
    }

    const readFile = (path: string) => {
        return window.ipcRenderer.invoke("read-file", path)
    }

    const showDialog = (options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue> => {
        return window.ipcRenderer.invoke("show-dialog", options)
    }

    const exportData = (structure: any, parts: any, selected: any) => {
        return window.ipcRenderer.invoke("export-data", {
            structure, parts, selected
        })
    }

    return { readClipboard, readFile, showDialog, exportData }
}

export default useInvoke;

