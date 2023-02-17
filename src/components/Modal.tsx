type modalProps = {
    setOpenModal: (condition: boolean) => void;
    children: React.ReactNode;
};
export default function Modal({ setOpenModal, children }: modalProps) {
    const closeModal = () => {
        setOpenModal(false);
    };
    return (
        <div
            className='overlay'
            onClick={(e) => {
                e.stopPropagation();
                closeModal();
            }}
        >
            <div
                className='modal-body'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
}
