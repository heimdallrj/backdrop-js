import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from 'screens/Home';
import Resources from 'screens/Resources';
import ResourceSingle from 'screens/Resources/Single';
import CreateResource from 'screens/Resources/Create';
import Media from 'screens/Media';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
            <li>
              <Link to="/media">Media</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/resources/create">
            <CreateResource />
          </Route>
          <Route exact path="/resources/:id">
            <ResourceSingle />
          </Route>
          <Route exact path="/media">
            <Media />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
