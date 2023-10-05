import { Component } from "react"
import { LoadMoreButton, StyledApp } from "./StyledApp";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { getImagesWithQuery } from "components/Service/Api";
import { Dna } from "react-loader-spinner";

export class App extends Component {
    state = {
        query: "",
        page: 1,
        images: [],
        isLoading: false,
        error: null,
        hasMoreImages: false,
    };

    changeQuery = (newQuery) => {
        this.setState({
            query: newQuery,
            page: 1,
            images: [],
        });
    };

    handleLoadMore = () => {
        this.setState(prevState => ({page: prevState.page + 1}))
     };

    async componentDidUpdate(prevProps, prevState) {

        if (
            prevState.query !== this.state.query ||
            prevState.page !== this.state.page
        ) {
            try {
                this.setState({ isLoading: true });
                const images = await getImagesWithQuery(
                    this.state.query,
                    this.state.page
                );
                this.setState(prevState => ({
                    images: [...prevState.images, ...images],
                    isLoading: false,
                    hasMoreImages: images.length > 0,
                }));
            } catch (error) {
                this.setState({ error, isLoading: false });
            } finally {
                this.setState({ isLoading: false });
            }
        }
    }

    render() {
        return (
            <StyledApp>
                <Searchbar
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        this.changeQuery(evt.target.elements.query.value);
                        evt.target.reset();
                    }}
                />
                {this.state.isLoading &&
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                }
                <ImageGallery gallery={this.state.images} Children={ImageGalleryItem} />
                <LoadMoreButton
                    onClick={this.handleLoadMore}
                    style={{ display: this.state.hasMoreImages ? "block" : "none" }}
                >
                    Load more
                </LoadMoreButton>
            </StyledApp>
        );
    }
}