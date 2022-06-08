### Create Vite

- This is a Vite project. [Read more here](https://github.com/vitejs/create-vite-app/blob/master/README.md).

  ```bash
    npm install

    npm run dev
  ```
### The Tech stack

- ReactJS
- ViteJS: a small frontend framework to speed the development and minimize the boilerplate process
- Redux: Global state management and backend with react-redux, redux-persist for storage and RTK Query for data fetching and cache management
- [React Router](https://github.com/ReactTraining/react-router)
- Vanilla CSS, Sass, Styled Components or any other CSS-in-JS but no frameworks allowed.

### What I Learned

Redux is an amazing library because it allows for the ability to think about logic ahead of time in terms of state, and actions will definitely allow for a more safe, fun and robust building experience

- The solution I provided ticks the boxes required however:
    1. it was delivered late because I was trying to wrap my head around how the library works and how to think about building apps in terms of state, actions as first citizens and not an afterthought
    2. the code can use some refactoring as big chunks of it is repetitive so we might be able to abstract some of the redundant knowledge into Higher Order Components or hooks and to be able to delete some code. I love deleting code when I find a more optimized solution.
    3. Infinite scrolling was not possible as it is not supported by the library by default. I was able to implement it based on a recommendation from the maintainer of the library but it kept erring out and messing with cache and order of rendering items. I looked at a couple of other options provided by the community but the ones suggested do not support query parameters which I need to be able to pass not only search term but page and per page parameters. I am sure there’s a way to get this done but for now I resorted to pagination to solve the problem
    4. regarding the user location and bio, these assets are not included in the GitHub search API to get these details, we would have to call the users and chain a subsequent profile API call to get the details. I wrote the code and included it in the GitHub API slice file. I did not implement this feature fully because it would take time and probably perform poorly
    5. I used styled components for the special rendering of the the search component where it starts in the middle on empty state and on the top left when results are populated.
    6. There is so much more to do here to improve the code, refactor it and clean it up. Happy to sit and discuss the details and improvements for refactoring