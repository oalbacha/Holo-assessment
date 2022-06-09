import React, { useState, useEffect } from "react";
import { useFetchReposQuery } from "./github-api-slice";
import { useSelector } from "react-redux";
import PaginationButton from "../../components/PaginationButton";

const Repos = () => {
  const [page, setPage] = useState(1)
  const per_page = 30

  const searchTerm  = useSelector(state => state.searchTerm);
  const dataType  = useSelector(state => state.dataType);

  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
  } = useFetchReposQuery({searchTerm, dataType, page, per_page}, { skip: !searchTerm  });
  const results = data ?? {};
  const lastPage = Math.ceil(results.total_count/per_page)

  if (isError && error?.status === 404) {
    return <div>Github repository not found</div>
  }

  if (isError) {
    return (
      <>
        <div>Error: {error.status}</div>
        <div>{error.error}</div>
      </>
    )
  }

  if (isLoading) {
    return <div className="text-hint">Loading GitHub...</div>;
  }

  if (isFetching) {
    return <div className="text-hint">Fetching GitHub...</div>;
  }

  if (searchTerm.length > 0 && searchTerm.length < 4) {
    return <div>Search starts at 4 character</div>
  }

  if(results && !results.total_count) {
    return <div>No GitHub data found</div>
  }

  if (results && dataType === 'Repos') {
    return (
      <>
        <ul className="App-grid">
          {results.items.map(({ id, name, owner, stargazers_count }) => {
            return (
              <li className="App-grid-item" key={id}>
                <h2>Name: {name}</h2>
                <p>Owner: {owner.login}</p>
                <p>Stars: {stargazers_count}</p>
              </li>
            )
          })}
        </ul>
        <div className="App-pagination">
          {
            page && page !== 1 && (
              <PaginationButton
                lastPage={lastPage}
                page={page}
                setPage={setPage}
                isLoading={isLoading}
                isFetching={isFetching}
                value={'Prev'}
                nextPage={false}
              />
            )
          }
          {
            page && page !== lastPage && (
              <PaginationButton
                lastPage={lastPage}
                page={page}
                setPage={setPage}
                isLoading={isLoading}
                isFetching={isFetching}
                value={'Next'}
                nextPage={true}
              />
            )
          }
        </div>
      </>

    )
  }
};

export default Repos;

