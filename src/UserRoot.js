import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import UserList from "./containers/UserList";
import AddForm from "./containers/AddForm";
import EditForm from "./components/EditForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUsersAction } from "./data/userSlice";

function UserRoot() {
  const data = useSelector(getAllUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("loadUsersAction");
    console.log("loadUsersAction");
    console.log("loadUsersAction");
    if (!data.length) dispatch(loadUsersAction());
  }, [data, dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/add">
          <AddForm />
        </Route>
        <Route path="/edit/:id">
          <EditForm />
        </Route>
        <Route path="/">
          <UserList />
        </Route>
      </Switch>
    </Router>
  );
}

export default UserRoot;
