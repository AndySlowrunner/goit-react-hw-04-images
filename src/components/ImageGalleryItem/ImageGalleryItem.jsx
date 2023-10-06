import { StyledImage, StyledItem } from "./StyledGalleryItem";
import Modal from 'react-modal';
import { nanoid } from 'nanoid';
import { useState } from "react";

const customStyles = {
    overlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display:' flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '1200',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    }
};

Modal.setAppElement('#root');

export const ImageGalleryItem = ({ items }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);

    const OpenModal = (imageId) => {
        setSelectedImageId(imageId);
        setModalOpen(true);
    };

    const ClouseModal = () => {
        setModalOpen(false);
        setSelectedImageId(null);
    };
    
    return (
        items.map(item => (
            <div key={nanoid()}>
                <StyledItem key={item.id}>
                    <StyledImage src={item.webformatURL} alt={item.tags} onClick={() => OpenModal(item.id)} />
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={ClouseModal}
                        style={customStyles}
                        contentLabel="Modal"
                    >
                        {items.map(item => item.id === selectedImageId && (
                            <img key={item.id} src={item.largeImageURL} alt={item.tags} />
                        ))}
                    </Modal>
                </StyledItem>
            </div>
        ))
    );
}