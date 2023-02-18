import React, { useState } from 'react';
import { useRef } from 'react';
import useControls from '../hooks/useControls';
import useValidation from './../hooks/useValidation';
import { error, fileItem, printers } from '@/types';

type contorolsProps = {
    addFileHandler: (fileItem: fileItem) => void;
    printersList: printers;
};
export default function Contorols({ addFileHandler, printersList }: contorolsProps) {
    // refrence to the file input so later it's value will be cleared
    const fileRef = useRef<HTMLInputElement>(null);
    const { state, changeHandler, buttonName, isActive, resetState, changeSelectHandler } =
        useControls(fileRef, null);
    const { validator } = useValidation(fileRef);
    const [errors, setErrors] = useState<error[] | []>([]);
    const addFile = () => {
        //input validations
        const failores = validator(state);
        if (failores.length > 0) {
            setErrors([...failores]);
        } else {
            addFileHandler({
                fileName: state.fileName,
                printerName: state.printerName,
                filePath: state.filePath,
                copies: state.copies,
                id: Math.random(),
            });

            resetState();
            setErrors([]);
        }
    };
    return (
        <div className='contorols'>
            <div className='adding-contorols'>
                <label className={isActive ? 'file-upload active' : 'file-upload'}>
                    <input
                        type='file'
                        onChange={(e) => changeHandler(e)}
                        ref={fileRef}
                        accept='application/pdf'
                    />
                    {buttonName}
                </label>
                <select
                    name='printerName'
                    id='printer'
                    onChange={(event) => changeSelectHandler(event)}
                >
                    {/* render printers list */}
                    {printersList &&
                        printersList.map((printer) => (
                            <option value={printer.name} key={printer.deviceId}>
                                {printer.name}
                            </option>
                        ))}
                </select>
                <div className='print-number'>
                    <label htmlFor='copies'>Number of Copies</label>
                    <input
                        type='text'
                        name='copies'
                        value={state.copies || 1}
                        onChange={(e) => changeHandler(e)}
                    />
                </div>
                <div className='errors'>
                    {errors &&
                        errors.map((error) => (
                            <p className='alert' key={error.id}>
                                - {error.message}
                            </p>
                        ))}
                </div>
            </div>
            <div className='add-item-button'>
                <button onClick={addFile}>Add</button>
            </div>
        </div>
    );
}
