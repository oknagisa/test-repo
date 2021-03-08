import React, { useEffect, useState } from "react";
/**
 * PS : On https://reqres.in/api/users the User Entity seems to support only 'email', 'first_name', 'last_name', 'avatar' keys only
 */

const FIELDS = ["email", "first_name", "last_name"];
const FIELD_TYPES = ["email", "text", "text"];

const defaultValues = FIELDS.reduce((acc, curr) => {
  acc[curr] = "";
  return acc;
}, {});

const Form = (props) => {
  const [formState, setFormState] = useState({
    ...(props.values || defaultValues),
  });
  useEffect(() => {
    setFormState({ ...props.values });
  }, [props.values]);
  return (
    <>
      <h1>{props.title}</h1>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          props.onSubmit(formState);
        }}
      >
        {FIELDS.map((field, index) => {
          return (
            <div>
              <input
                type={FIELD_TYPES[index]}
                key={field}
                value={formState[field]}
                placeholder={field}
                required={true}
                onChange={(evt) => {
                  setFormState({ ...formState, [field]: evt.target.value });
                }}
              />
            </div>
          );
        })}
        <div>
          <input type={"submit"} />
        </div>
      </form>
    </>
  );
};

export default Form;
