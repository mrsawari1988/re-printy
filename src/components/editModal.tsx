import useControls from './../hooks/useControls';
import { fileItem, printers } from '@/types';
type editModalProps = {
    editItem: fileItem | null;
    setOpenModal: (condition: boolean) => void;
    setEditItem: (item: fileItem | null) => void;
    updateFileItem: (item: fileItem) => void;
    printersList: printers;
};
export default function EditModal({
    editItem,
    setOpenModal,
    setEditItem,
    updateFileItem,
    printersList,
}: editModalProps) {
    const { state, changeHandler, changeSelectHandler } = useControls(null, editItem);

    const update = () => {
        updateFileItem(state);
        setEditItem(null);
        setOpenModal(false);
    };
    const closeModal = () => {
        setEditItem(null);
        setOpenModal(false);
    };
    return (
        <>
            <div className='modal-header'>
                <h3>Edit File Item</h3>
            </div>
            <div className='modal-content'>
                <label>{state.fileName || ''}</label>
                <select
                    name='printerName'
                    id='printer'
                    value={state.printerName || ''}
                    onChange={(e) => changeSelectHandler(e)}
                >
                    {/* render printers list */}
                    {printersList &&
                        printersList.map((printer) => (
                            <option value={printer.name} key={printer.deviceId}>
                                {printer.name}
                            </option>
                        ))}
                </select>
                <input
                    type='text'
                    name='copies'
                    value={state.copies || ''}
                    onChange={(e) => changeHandler(e)}
                />
                <button onClick={() => update()} className='update-botton'>
                    Update
                </button>
            </div>
            <div className='modal-footer'>
                <button onClick={() => closeModal()} className='cancel-botton'>
                    Cancel
                </button>
            </div>
        </>
    );
}
