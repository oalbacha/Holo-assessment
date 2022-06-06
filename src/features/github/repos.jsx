import React, { useState, useEffect, useMemo } from "react";
import { useFetchReposQuery } from "./github-api-slice";
import { useSelector } from "react-redux";

const Repos = () => {
  const [page, setPage] = useState(1)
  const per_page = 30

  const searchTerm  = useSelector(state => state.searchTerm);
  const dataType  = useSelector(state => state.dataType);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentPage = 4350 // a page with 30 repos will have a scroll position of ~4350
  const lastResult = useFetchReposQuery({searchTerm, dataType, page: page - 1, per_page}, { skip: !searchTerm && page === 1  });
  const currentResult = useFetchReposQuery({searchTerm, dataType, page, per_page}, { skip: !searchTerm  });
  const nextResult = useFetchReposQuery({searchTerm, dataType, page: page + 1, per_page}, { skip: !searchTerm  });

  const combined = useMemo(() => {
    const arr = new Array(per_page * (currentPage + 1))
    for (const data of [lastResult.data, currentResult.data, nextResult.data]) {
      if (data) {
        arr.splice(data.total_count, data.items.length, ...data.items)
      }
    }
    return arr
  }, [per_page, currentPage, lastResult.data, currentResult.data, nextResult.data])
  const {
    isFetching,
    isLoading,
    isError,
    error,
  } = currentPage // since we only care about the page we are on at the moment

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

  if (combined && dataType === 'Repos') {
    return (
      <ul>
        {combined.map(({ id, name, owner, stargazers_count }) => {
          return (
            <div key={id}>
              <li>
                <h2>Name: {name}</h2>
                <p>Owner: {owner.login}</p>
                <p>Stars: {stargazers_count}</p>
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
};

export default Repos;