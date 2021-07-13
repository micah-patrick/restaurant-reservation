import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function TableNew() {

    const history = useHistory();

    const [tableName, setTableName] = useState("");
    const [capacity, setCapacity] = useState(1);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTable = {
            "table_name": tableName,
            "capacity": Number(capacity),
        }
        createTable(newTable)
        .then((result) => {
                console.log("submitted");
                console.log(result);
                history.push(`/dashboard`)
            })
            .catch(setError)
    }



    return(
        <>
      <h2> New Table</h2>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit}>
        {/*name input*/}
        <div className="form-group">
          <label htmlFor="tableName">Table Name</label>
          <input
            className="form-control"
            id="tableName"
            type="text"
            name="table_name"
            onChange={(event) => {setTableName(event.target.value);}}
            value={tableName}
            maxLength="50"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            className="form-control"
            id="capacity"
            type="number"
            name="capacity"
            onChange={(event) => {setCapacity(event.target.value);}}
            value={capacity}
            min="1"
            required
          />
        </div>
       
        {/*cancel button*/}
        <button className="btn btn-secondary mx-1 mb-3" to="/"
            onClick={() =>history.goBack()}
        >
          <span className="oi oi-circle-x mr-2" />
          Cancel
        </button>
        {/*submit button*/}
        <button className="btn btn-primary mx-1 mb-3" type="submit">
          <span className="oi oi-circle-check mr-2" />
          Submit
        </button>

      </form>
    </>
    )
}