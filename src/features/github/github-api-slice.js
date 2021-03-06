import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
    prepareHeaders(headers) {
      headers.set('authorization', import.meta.env.VITE_GITHUB_ACCESS_TOKEN);
      headers.set('Accept', 'application/vnd.github.v3+json');
      headers.set('Accept', 'application/vnd.github.v3.text-match+json');

      return headers;
    }
  }),
  endpoints(builder) {
    return {
      fetchRepos: builder.query ({
        query({searchTerm, dataType, page, per_page}) {
          if(dataType === 'Repos' && searchTerm !== undefined) {
            return `/search/repositories?q=${searchTerm}&page=${page}&per_page=${per_page}`;
          }
        },
      }),
      fetchIssues: builder.query ({
        query({searchTerm, dataType, page=1, per_page}) {
          if(dataType === 'Issues' && searchTerm !== undefined) {
            return `/search/issues?q=${searchTerm}&page=${page}&per_page=${per_page}`;
          }
        },
      }),
      fetchUsers: builder.query ({
        query({searchTerm, dataType, page=1, per_page}) {
          if(dataType === 'Users' && searchTerm !== undefined) {
            return `/search/users?q=${searchTerm}&page=${page}&per_page=${per_page}`;
          }
        },
      }),
      fetchUsersForProfiles: builder.query ({
        query({searchTerm, dataType}) {
          if(dataType === 'Users' && searchTerm !== undefined) {
            return `/search/users?q=${searchTerm}`;
          }
        },
        transformResponse(response) {
          const data = response.items
          return data
        }
      }),
      fetchProfiles: builder.query ({
        query({login}) {
           if(login) {
            return `/${login}`;
          }
        },
        transformResponse(response) {
          console.log(response) // here we get an array calling each users profile based on the search term. I got a 422 when testing.
        }
      })
    };
  },
  refetchOnMountOrArgChange: 60
});

export const { useFetchReposQuery, useFetchIssuesQuery, useFetchUsersQuery, useFetchUsersForProfilesQuery, useFetchProfiles } = githubApiSlice;
