import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/Auth/Login";
import Logout from "../Components/Auth/Logout";
import CreateTask from "../Components/CreateTask/CreateTask";
import CreateSubtask from "../Components/CreateSubtask/CreateSubtask";
import TaskList from "../Components/TaskList/TaskList";
import Profile from "../Components/Profile/Profile";
import Setting from "../Components/Setting/Setting";
import UpdateTask from "../Components/UpdateTask/UpdateTask";
import UpdateSubtask from "../Components/UpdateSubtask/UpdateSubtask";
import UserPassword from "../Components/UpdatePassword/UserPassword";
import Register from "../Components/Register/Register";

var user = JSON.parse(localStorage.getItem("user"));
let isLoggedIn = false;
if (user != null) {
  isLoggedIn = true;
} else {
  isLoggedIn = false;
}

// const isLoggedIn = true;

const RequireAuth = ({ children }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return children;
};

const AppLayout = () => (
  <Switch>
    <Route path="/register" component={(props) => <Register {...props} />} />

    <Route path="/login">
      {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
    </Route>
    <RequireAuth>
      <Route exact path="/" component={(props) => <Dashboard {...props} />} />
      <Route
        path="/dashboard"
        component={(props) => <Dashboard {...props} />}
      />
      <Route
        path="/create-task"
        component={(props) => <CreateTask {...props} />}
      />
      <Route
        path="/create-subtask"
        component={(props) => <CreateSubtask {...props} />}
      />
      <Route path="/task-list" component={(props) => <TaskList {...props} />} />
      <Route
        path="/update-subtask/:id"
        component={(props) => <UpdateSubtask {...props} />}
      />
      <Route
        path="/update-task/:id"
        component={(props) => <UpdateTask {...props} />}
      />
      <Route
        path="/update-password"
        component={(props) => <UserPassword {...props} />}
      />
      <Route path="/profile" component={(props) => <Profile {...props} />} />
      <Route path="/setting" component={(props) => <Setting {...props} />} />
      <Route path="/login" component={(props) => <Login {...props} />} />
      <Route path="/logout" component={(props) => <Logout {...props} />} />
    </RequireAuth>
  </Switch>
);
export default AppLayout;
