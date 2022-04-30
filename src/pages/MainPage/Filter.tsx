import React from "react";

interface IFilter {
  onChange(val: string): void;
  searchWord: string;
}

export default function Filter({ onChange, searchWord }: IFilter) {
  return (
    <div className="row">
      <div className="input-field col">
        <input
          value={searchWord}
          onChange={({ target }) => onChange(target.value)}
          id="searchPeople"
          placeholder="Search people"
          type="text"
          className="validate"
        ></input>
        <label className="active" htmlFor="searchPeople">
          Name
        </label>
      </div>
    </div>
  );
}
