import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Countries from './components/Countries';
import Country from './components/Country';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/:id' children={<Country />} />
        <Route exact path='/'>
          <Countries/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
