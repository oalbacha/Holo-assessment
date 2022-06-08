import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './components/nav/nav'
import Repos from './features/github/repos'
import Issues from './features/github/issues'
import Users from './features/github/users'
import './App.css'

function App() {
  const dataType  = useSelector(state => state.dataType);
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-wrapper">
          <div className="App-nav-space"></div>
          <Nav />
          <div className='App-grid-container'>
            <Routes>
              <Route
                path='/'
                element= {
                  dataType === 'Repos'
                  ? <Repos />
                  : dataType === 'Issues'
                  ? <Issues />
                  : dataType === 'Users'
                  ? <Users />
                  : null
                }
              />
            </Routes>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
