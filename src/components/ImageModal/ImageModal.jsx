import css from './ImageModal.module.css'
import Modal from 'react-modal'

Modal.setAppElement('#root');

const ImageModal = ({ modalImgInfo, isOpen, onRequestClose }) => {
    return (
        <Modal className={css.modal}
            overlayClassName={css.ReactModal__Overlay}
            isOpen={isOpen}
            onRequestClose={onRequestClose}>
        <img className={css.imgModal}
            alt={modalImgInfo.name}
            src={modalImgInfo.srcReg} />
        <div className={css.imgTextCont}>
            <p className={css.imgText}>{modalImgInfo.name}</p>
            <p className={css.imgText}>Likes: {modalImgInfo.likes}</p>
        </div>        
        </Modal>
    )
}

export default ImageModal

