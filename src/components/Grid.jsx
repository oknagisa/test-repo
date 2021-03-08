import React, { useMemo, useState } from "react";

const HEADINGS = ["email", "First Name", "Last Name"];
const DATA_KEYS_TO_DISPLAY = ["email", "first_name", "last_name"];
const SEARCHABLE_KEYS = ["email", "first_name", "last_name"];

const useFilteredSearch = (data) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.length) return data;
    return data.filter((user) => {
      return SEARCHABLE_KEYS.some((key) => {
        return user[key]?.includes(search);
      });
    });
  }, [data, search]);
  return [filteredData, search, setSearch];
};

const renderActionItems = (id, onActionItemClicked) => {
  return (
    <>
      <button onClick={() => onActionItemClicked("edit", id)}>Edit</button>
      <button onClick={() => onActionItemClicked("delete", id)}>Delete</button>
    </>
  );
};

const Grid = (props) => {
  const [data, searchText, setSearchText] = useFilteredSearch(props.data);

  return (
    <div>
      <input
        placeholder={"Search for names,email..."}
        value={searchText}
        onChange={(evt) => {
          setSearchText(evt.target.value);
        }}
      />
      <button onClick={() => props.onActionItemClicked("add")}>
        {" "}
        Add User{" "}
      </button>
      <table>
        <tr>
          {HEADINGS.map((heading) => (
            <th>{heading}</th>
          ))}
        </tr>
        {data?.map((user) => {
          return (
            <tr key={user.id}>
              {DATA_KEYS_TO_DISPLAY.map((key) => {
                return <td>{user[key] || "N/A"}</td>;
              })}
              <td>{renderActionItems(user.id, props.onActionItemClicked)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Grid;
