import { useState, Ref, ChangeEvent } from 'react';
import { fileItem } from '@/types';
const useControls = (fileRef: any, initialState = { copies: 1 }) => {
    // this hook is used by contorols component and Modal component , so in modal we pass the editable item as the initial state
    const [state, setState] = useState<fileItem | { copies: number }>({ ...initialState });
    //using this variable to set the button name to file name
    const [buttonName, setButtonName] = useState('choose a file');
    //this vatiable is being used to determine the button class
    const [isActive, setIsActive] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (event.target.type === 'file') {
            const { files } = event.target;
            const selectedFiles = files as FileList;
            setState((state) => ({
                ...state,
                fileName: selectedFiles[0].name,
                filePath: selectedFiles[0].path,
            }));
            setButtonName(selectedFiles[0].name);
            setIsActive(true);
        } else {
            setState((state) => ({ ...state, [event.target.name]: event.target.value }));
        }
    };

    const resetState = () => {
        setButtonName('Choose file');
        setState({ copies: 1 });
        //clearing the file input value
        fileRef.current.value = null;
        setIsActive(false);
    };
    return {
        state,
        changeHandler,
        buttonName,
        isActive,
        resetState,
    };
};

export default useControls;
