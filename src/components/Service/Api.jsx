import axios from "axios";

export const getImagesWithQuery = async (query, page) => {
    const response = await axios.get(`https://pixabay.com/api/?page=${page}&q=${query}&key=36730507-d69436f33261eb3b1b2a44ec5&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data.hits;
};