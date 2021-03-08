import React, { useCallback } from "react";
import Form from "../containers/Form";
import { getUserById, saveUser } from "../data/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const useEditForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector(getUserById(id));
  const onEditForm = useCallback(
    (user) => {
      dispatch(saveUser(user, "edit"));
      history.push("/");
    },
    [dispatch, history]
  );

  return [user, onEditForm];
};
const EditForm = () => {
  const [user, onSubmit] = useEditForm();
  console.log("Koo", user);
  console.log("Koo", user);
  console.log("Koo", user);
  console.log("Koo", user);
  return <Form title={"Edit User"} onSubmit={onSubmit} values={user} />;
};

export default EditForm;
