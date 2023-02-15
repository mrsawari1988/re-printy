import React from 'react';
type footerProps = {
    printHandler: () => void;
    clearAllFilesHandler: () => void;
};
export default function Footer({ printHandler, clearAllFilesHandler }: footerProps) {
    return (
        <div>
            <div className='footer'>
                <button className='clear-btn' onClick={() => clearAllFilesHandler()}>
                    Clear all
                </button>
                <button onClick={() => printHandler()}>Printy</button>
            </div>
        </div>
    );
}
