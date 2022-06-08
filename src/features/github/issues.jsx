import React, { useState, useEffect } from "react";
import { useFetchIssuesQuery } from "./github-api-slice";
import { useSelector } from "react-redux";

const Issues = () => {
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
  } = useFetchIssuesQuery({searchTerm, dataType, page, per_page}, { skip: !searchTerm  });
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

  if (searchTerm.length < 4) {
    return null
  }

  if(results && !results.total_count) {
    return <div>No GitHub data found</div>
  }

  if (results && dataType === 'Issues') {
    return (
      <ul className="App-grid">
        {results.items.map(({ id, title, body, state, updated_at, url, user }) => (
          <li className="App-grid-item" key={id}>
            <a className='App-grid-item-link' href={url}>
              <h2>Title: {title}</h2>
              <p>Status: {state}</p>
              <p>Last Active: {updated_at}</p>
              <p>Belongs to: {user.login}</p>
            </a>
          </li>
        ))}
        {page !== 1 && (
          <button
            onClick={() => setPage(page - 1)}
            isLoading={isFetching}
          >
            Prev
          </button>
        )}
        {page !== lastPage && (
          <button
            onClick={() => setPage(page + 1)}
            isLoading={isFetching}
          >
            Next
          </button>
        )}
      </ul>
    )
  }
};

export default Issues;

