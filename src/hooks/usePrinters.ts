import { useState, useEffect } from 'react';
import { printers } from '@/types';
const usePrinters = () => {
    const [printersList, setPrintersList] = useState<printers | []>([]);

    useEffect(() => {
        //get printers from electronjs
        const fetchPrinters = async () => {
            const printers: printers = await window.electronAPI.getPrinters();
            setPrintersList(printers);
            console.log(printers);
        };

        try {
            fetchPrinters();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return { printersList };
};

export default usePrinters;
