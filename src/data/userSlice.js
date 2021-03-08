import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "counter",
  initialState: {
    data: {},
  },
  reducers: {
    setUsersAction: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload;
    },
    setUserAction: (state, action) => {
      state.data[action.payload.id] = action.payload;
    },
    removeUserAction: (state, action) => {
      delete state.data[action.payload.id];
    },
  },
});

// ========= Action creators =====//
export const {
  setUsersAction,
  setUserAction,
  removeUserAction,
} = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// =============== API Thunks ===============//
export const loadUsersAction = () => (dispatch) => {
  fetch("https://reqres.in/api/users")
    .then((res) => res.json())
    .then((response) => {
      const data = response.data;
      const usersMap = data.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      dispatch(setUsersAction(usersMap));
    })
    .catch(() => {
      dispatch(setUsersAction({}));
    });
};

export const saveUser = (user, saveContext) => (dispatch) => {
  const method = saveContext === "edit" ? "PATCH" : "POST";
  const id = saveContext === "edit" ? user.id : "" + Date.now();
  fetch(`https://reqres.in/api/users/${user.id}`, {
    method,
    body: JSON.stringify(user),
  })
    .then(() => {
      dispatch(setUserAction({ id, ...user }));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const removeUser = (id) => (dispatch) => {
  fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
  }).then(() => {
    dispatch(removeUserAction({ id }));
  });
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// ======= Selectors ======= //
export const getUserById = (id) => (state) => {
  return state.user.data[id];
};
export const getAllUsers = (state) => {
  return Object.values(state.user.data);
};

export default userSlice.reducer;
