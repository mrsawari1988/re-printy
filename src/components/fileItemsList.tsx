import React from 'react';
//import ListItem from './listItem';
import FileItem from './fileItem';
//sortable imports
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { fileItem, fileItems } from '@/types';
type fileListSetter = (fileItems: fileItem[]) => fileItems;

type fileItemListProps = {
    filesList: fileItem[];
    deleteFileHandler: (id: number) => void;
    setFilesList: (fn: fileListSetter) => void;
    setEditItem: (item: fileItem | null) => void;
    setOpenModal: (condition: boolean) => void;
};

export default function FileItemList({
    filesList,
    deleteFileHandler,
    setFilesList,
    setEditItem,
    setOpenModal,
}: fileItemListProps) {
    const sensors = useSensors(useSensor(PointerSensor));

    //this function update the order of the state array after draging and droping an item to a new place
    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setFilesList((filesList: fileItem[]): fileItem[] => {
                const oldIndex = filesList.map((item) => item.id).indexOf(active.id);
                const newIndex = filesList.map((item) => item.id).indexOf(over.id);

                return arrayMove(filesList, oldIndex, newIndex);
            });
        }
    }
    if (filesList.length < 1) {
        return (
            <div className='list-items'>
                <div className='no-file'>
                    <h5>there is no file</h5>
                </div>
            </div>
        );
    }
    return (
        <div className='list-items'>
            {/* this component are used to make Drag&Drop */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={filesList} strategy={verticalListSortingStrategy}>
                    <ul>
                        {filesList.map((item) => {
                            return (
                                <FileItem
                                    fileName={item.fileName}
                                    printerName={item.printerName}
                                    copies={item.copies}
                                    key={item.id}
                                    id={item.id}
                                    deleteFileHandler={deleteFileHandler}
                                    handle={true}
                                    setEditItem={setEditItem}
                                    setOpenModal={setOpenModal}
                                    item={item}
                                />
                            );
                        })}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
}
