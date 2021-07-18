import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from 'screens/Home';
import Resources from 'screens/Resources';
import ResourceSingle from 'screens/Resources/Single';
import CreateResource from 'screens/Resources/Create';
import Media from 'screens/Media';

import Nav from 'components/Nav';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

const Main = styled.div`
  height: 100vh;
  flex: 14;
  padding: 15px;
`;

function App() {
  return (
    <Router>
      <Wrapper>
        <Nav />
        <Main>
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
        </Main>
      </Wrapper>
    </Router>
  );
}

export default App;
