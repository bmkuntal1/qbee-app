import Modal from '@restart/ui/Modal';

const PageModal = ({ children, className, title, show, onShow, onClose }) => {
    return (
        <Modal show={show} onShow={onShow} onHide={onClose} className="modal d-block" renderBackdrop={() => <div className="modal-backdrop opacity-50"></div>}>
            <div className={`modal-dialog ${className}`}>
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title" id="modalTitleId">
                            {title}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PageModal;