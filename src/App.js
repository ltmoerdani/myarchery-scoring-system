import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { AuthLayout } from "./layouts";
import { AuthenticationMiddleware } from "./middlewares";
import {
  authenticationRoutes,
  dashboardRoutes,
  certificateRoutes,
  workingRoutes,
  dosRoutes,
  liveScoreRoutes,
} from "./routes";

import { LayoutDashboard, LayoutLiveScores } from "layouts/ma";
import { LayoutDashboardDos } from "layouts/dashboard-dos";

import { EventDetailProvider } from "contexts/event-detail";

import "./assets/scss/theme.scss";
import "react-datepicker/dist/react-datepicker.css";

const RedirectToLogin = () => <Redirect to="/login" />;

const App = () => {
  return (
    <Router>
      <EventDetailProvider>
        <Switch>
          <AuthenticationMiddleware
            path="/"
            layout={React.Fragment}
            component={RedirectToLogin}
            isAuthProtected={false}
            exact
          />
          {authenticationRoutes.map((route) => (
            <AuthenticationMiddleware
              path={route.path}
              layout={AuthLayout}
              component={route.component}
              key={route.path}
              isAuthProtected={false}
              exact
            />
          ))}
          {dashboardRoutes.map((route) => (
            <AuthenticationMiddleware
              path={route.path}
              layout={LayoutDashboard}
              component={route.component}
              key={route.path}
              isAuthProtected={true}
              exact
            />
          ))}
          {certificateRoutes.map((route) => (
            <AuthenticationMiddleware
              path={route.path}
              layout={LayoutDashboard}
              component={route.component}
              key={route.path}
              isAuthProtected={true}
              exact
            />
          ))}
          {liveScoreRoutes.map((route) => (
            <AuthenticationMiddleware
              path={route.path}
              layout={LayoutLiveScores}
              component={route.component}
              key={route.path}
              isAuthProtected={false}
              exact
            />
          ))}
          {workingRoutes.map((route) => (
            <AuthenticationMiddleware
              path={route.path}
              layout={AuthLayout}
              component={route.component}
              key={route.path}
              isAuthProtected={false}
              exact
            />
          ))}
          {dosRoutes.map((route) => (
            <AuthenticationMiddleware
              path={route.path}
              layout={LayoutDashboardDos}
              component={route.component}
              key={route.path}
              isAuthProtected={false}
              exact
            />
          ))}
          <Redirect to="/working/not-found" />
        </Switch>
      </EventDetailProvider>
    </Router>
  );
};

export default App;
