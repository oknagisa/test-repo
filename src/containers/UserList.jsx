import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Grid from "../components/Grid";
import { getAllUsers, removeUser } from "../data/userSlice";
import { useDispatch, useSelector } from "react-redux";

const useActionItemClickHandler = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return useCallback(
    (key, payload) => {
      if (
        key === "delete" &&
        window.confirm("Are you sure to delete this item?")
      ) {
        dispatch(removeUser(payload));
        // delete
      } else if (key === "add") {
        history.push("/add");
      } else {
        history.push("/edit/" + payload);
      }
    },
    [dispatch, history]
  );
};

const UserContainer = () => {
  const data = useSelector(getAllUsers);
  const onActionItemClicked = useActionItemClickHandler();
  return <Grid data={data} onActionItemClicked={onActionItemClicked} />;
};

export default UserContainer;
