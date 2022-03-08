import React, { useState } from 'react';
import SearchUser from './SearchUser';
import AppProvider from './AppContext';
import './App.css';

const App = () => {

  const [isActiveHeaderUnderline, setisActiveHeaderUnderline] = useState(true)
  const handleClick = () => {
    setisActiveHeaderUnderline(prevVal => !prevVal)
  }

  let classes = "App-header"

  return (
    <div className="App">
      <header >
          <h2 className={isActiveHeaderUnderline ? classes += " line" : classes} onClick={handleClick}>
            Aplikacja .Net - React "UsersApp"
          </h2>
      </header>
      <div className="container">
        <AppProvider isActiveHeaderUnderline={isActiveHeaderUnderline}>
          <SearchUser />
        </AppProvider>
      </div>
    </div>
  );
}

export default App;
