import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { ping as apiPing } from 'api';

import Loading from 'components/Loading/FullPage';
import ProtectedRoute from 'components/ProtectedRoute';
import Route from 'components/Route';

import Bootstrap from 'screens/Bootstrap';
import Login from 'screens/Login';
import ResetLogin from 'screens/Login/Reset';
import Register from 'screens/Register';
import Home from 'screens/Home';
import Resources from 'screens/Resources';
import UpdateResource from 'screens/Resources/Update';
import CreateResource from 'screens/Resources/Create';
import Crud from 'screens/Crud';
import CrudCreate from 'screens/Crud/Create';
import CrudUpdate from 'screens/Crud/Update';
import Media from 'screens/Media';
import Settings from 'screens/Settings';
import Users from 'screens/Users';
import UsersCreate from 'screens/Users/Create';
import UsersUpdate from 'screens/Users/Update';
import UsersMe from 'screens/Users/Me';
import Logout from 'screens/Logout';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [bootstrap, setBootstrap] = useState(null);

  const ping = async () => {
    const heartbeat = await apiPing();
    if (heartbeat === null) {
      setBootstrap(!!!heartbeat);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    ping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  if (bootstrap) return <Bootstrap />;

  return (
    <Wrapper>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/reset-password" component={ResetLogin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />

        <ProtectedRoute exact path="/" component={Home} />

        <ProtectedRoute
          featureId="resources"
          exact
          path="/resources"
          component={Resources}
        />
        <ProtectedRoute
          featureId="resources"
          exact
          path="/resources/create"
          component={CreateResource}
        />
        <ProtectedRoute
          featureId="resources"
          exact
          path="/resources/update/:name"
          component={UpdateResource}
        />

        <ProtectedRoute featureId="curd" exact path="/crud" component={Crud} />
        <ProtectedRoute
          featureId="curd"
          exact
          path="/crud/:resource"
          component={CrudCreate}
        />
        <ProtectedRoute
          featureId="curd"
          exact
          path="/crud/:resource/:id"
          component={CrudUpdate}
        />

        <ProtectedRoute
          featureId="media"
          exact
          path="/media"
          component={Media}
        />

        <ProtectedRoute
          featureId="settings"
          exact
          path="/settings"
          component={Settings}
        />

        <ProtectedRoute
          featureId="users"
          exact
          path="/users"
          component={Users}
        />
        <ProtectedRoute
          featureId="users"
          exact
          path="/users/me"
          component={UsersMe}
        />
        <ProtectedRoute
          featureId="users"
          exact
          path="/users/create"
          component={UsersCreate}
        />
        <ProtectedRoute
          featureId="users"
          exact
          path="/users/update/:id"
          component={UsersUpdate}
        />
      </Router>
    </Wrapper>
  );
}

export default App;
