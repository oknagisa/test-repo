import React, { useCallback } from "react";
import Form from "./Form";
import { saveUser } from "../data/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useAddForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return useCallback(
    (user) => {
      dispatch(saveUser(user, "add"));
      history.push("/");
    },
    [dispatch, history]
  );
};
const AddForm = () => {
  const onSubmit = useAddForm();
  return <Form title={"Add User"} onSubmit={onSubmit} />;
};

export default AddForm;
