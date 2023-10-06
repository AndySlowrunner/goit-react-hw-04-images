import { LoadMoreButton, StyledApp } from "./StyledApp";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { getImagesWithQuery } from "components/Service/Api";
import { Dna } from "react-loader-spinner";
import { useEffect, useState } from "react";

export const App = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMoreImages, setHasMoreImages] = useState(false);

    useEffect(() => {
        async function getImages() {
            try {
                setIsLoading(true);
                const imagesWithQuery = await getImagesWithQuery(query, page);
                setImages(prevState => [...prevState, ...imagesWithQuery]);
                setIsLoading(false);
                setHasMoreImages(imagesWithQuery.length > 0);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }

        };
        if (query !== "") {
            getImages();
        };
    }, [query, page, error]);
    
    const changeQuery = (newQuery) => {
        setQuery(newQuery);
        setPage(1);
        setImages([]);
        setError(null);
    };

    const handleLoadMore = () => {
        setPage(prevState => prevState + 1);
    };

    return (
        <StyledApp>
            <Searchbar
                onSubmit={(evt) => {
                    evt.preventDefault();
                    changeQuery(evt.target.elements.query.value);
                    evt.target.reset();
                }}
            />
            {isLoading &&
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            }
            <ImageGallery gallery={images} Children={ImageGalleryItem} />
            <LoadMoreButton
                onClick={handleLoadMore}
                style={{ display: hasMoreImages ? "block" : "none" }}
            >
                Load more
            </LoadMoreButton>
        </StyledApp>
    );
}