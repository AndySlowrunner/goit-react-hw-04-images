import { StyledGallery } from "./StyledGallery";

export const ImageGallery = ({ Children, gallery }) => {
    return (
        <StyledGallery>
            <Children items={gallery} />
        </StyledGallery>
    )
};