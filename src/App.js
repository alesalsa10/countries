import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Countries from './components/Countries/Countries';
import Country from './components/Country/Country';
import Header from './components/Header/Header';

import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from './themes/themes'
import {GlobalStyles} from './themes/global'

function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light'){
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <GlobalStyles/>
        <Header onClick={toggleTheme} theme={theme} />
        <Switch>
          <Route path='/:id' children={<Country theme={theme}/>} />
          <Route exact path='/'>
            <Countries theme={theme}/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
