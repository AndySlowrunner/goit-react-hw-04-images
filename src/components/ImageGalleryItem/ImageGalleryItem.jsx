import { Component } from "react";
import { StyledImage, StyledItem } from "./StyledGalleryItem";
import Modal from 'react-modal';
import { nanoid } from 'nanoid';

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

export class ImageGalleryItem extends Component {
    state = {
        isModalOpen: false,
        selectedImageId: null,
    }

    OpenModal = (imageId) => this.setState({ isModalOpen: true, selectedImageId: imageId });
    ClouseModal = () => this.setState({ isModalOpen: false, selectedImageId: null });
    
    render() {
        const { items } = this.props;
        return (
        items.map(item => (
            <div key={nanoid()}>
                <StyledItem key={item.id}>
                    <StyledImage src={item.webformatURL} alt={item.tags}  onClick={() => this.OpenModal(item.id)}/>
                    <Modal
                        isOpen={this.state.isModalOpen}
                        onRequestClose={this.ClouseModal}
                        style={customStyles}
                        contentLabel="Modal"
                    >
                        {items.map(item => item.id === this.state.selectedImageId && (
                            <img key={item.id} src={item.largeImageURL} alt={item.tags} />
                        ))}
                    </Modal>
                </StyledItem>
            </div>
        ))
    )};
};