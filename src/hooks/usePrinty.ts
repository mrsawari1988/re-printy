import { useState } from 'react';
import { fileItem, fileItems } from '@/types';
const usePrinty = () => {
    const [filesList, setFilesList] = useState<fileItems | []>([]);
    const addFileHandler = (newFile: fileItem) => {
        setFilesList([...filesList, newFile]);
    };
    const deleteFileHandler = (id: number) => {
        setFilesList(filesList.filter((item) => item.id !== id));
    };
    const clearAllFilesHandler = () => {
        setFilesList([]);
    };

    return { filesList, setFilesList, deleteFileHandler, clearAllFilesHandler, addFileHandler };
};

export default usePrinty;
