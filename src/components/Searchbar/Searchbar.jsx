import { StyledSearch, StyledForm, StyledFormButton, StyledButtonLable, StyledFormInput } from "./StyledSearchbar";
import { BiSearchAlt2 } from "react-icons/bi";

export const Searchbar = ({ onSubmit }) => {
    return (
        <StyledSearch>
            <StyledForm onSubmit={onSubmit}>
                <StyledFormButton type="submit">
                    <BiSearchAlt2/>
                    <StyledButtonLable />
                </StyledFormButton>

                <StyledFormInput
                    type="text"
                    name="query"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </StyledForm>
        </StyledSearch>
    );
}