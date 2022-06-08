import React, { useState, useEffect } from "react";
import { useFetchUsersQuery } from "./github-api-slice";
import { useSelector } from "react-redux";

const Users = () => {
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
  } = useFetchUsersQuery({searchTerm, dataType, page, per_page}, { skip: !searchTerm  });
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
    return <div className="text-hint">Search starts at 4 characters, type more...</div>;
  }

  if(results && !results.total_count) {
    return <div>No GitHub data found</div>
  }

  if (results && dataType === 'Users') {
    return (
      <ul className="App-grid">
        {results.items.map(({ id, login, url, avatar_url }) => {
          return (
            <li className="App-grid-item" key={id}>
              <a href={url}>
                <img className='App-user-image' src={avatar_url} alt={`${login}'s profile image`} />
                <h2>Name: {login}</h2>
              </a>
            </li>
          )
        })}
        {page && page !== 1 && (
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

export default Users;

