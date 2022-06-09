import { useState } from "react";
import StyledPaginationButton from "./styled-pagination-button.styled";

const PaginationButton = ({page, setPage, isLoading, isFetching, value, lastPage, nextPage}) => (
  <>
    {!nextPage ? (
      <StyledPaginationButton
        isLoading={isFetching}
        onClick={() => setPage(page - 1)}
      >
        {value}
      </StyledPaginationButton>
    ) : (
      <StyledPaginationButton
        isLoading={isFetching}
        onClick={() => setPage(page + 1)}
      >
        {value}
      </StyledPaginationButton>
    )}
  </>
)
export default PaginationButton;
