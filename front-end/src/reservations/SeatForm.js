import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listFreeTables, readReservation, assignTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router-dom";

export default function SeatForm() {

    const history = useHistory();
    const reservation_id = useParams().reservation_id

    const [table_id, setTable_id] = useState("");
    const [reservation, setReservation] = useState("");
    const [tables, setTables] = useState([]);
    const [reservationError, setReservationError] = useState(null);
    const [tablesError, setTablesError] = useState(null);
    const [seatError, setSeatError] = useState(null);
    const [tableOptions, setTableOptions] = useState(null)

    useEffect(loadReservation, [reservation_id]);
    useEffect(loadTables, [reservation]);
    useEffect(() => {
        setTableOptions(
            tables.map((table, index) => {
                return <option key={index} value={table.table_id}>{table.table_name} - {table.capacity}</option>
            })
        )
    }, [tables])

    function loadReservation() {
        const abortController = new AbortController();
        setReservationError(null);
        readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setReservationError);
        return () => abortController.abort();
    }
    
    function loadTables() {
        const abortController = new AbortController();
        setTablesError(null);
        listFreeTables({capacity: reservation.people}, abortController.signal)
        .then(setTables)
        .catch(setTablesError);
        return () => abortController.abort();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        setSeatError(null);
        assignTable(reservation_id, table_id, abortController.signal)
        .then(() => { history.push(`/dashboard`) })
        .catch(setSeatError);
        return () => abortController.abort();
    }

    

console.log(table_id);

    return(
        <>
      <h2> Seat Reservation {reservation_id}</h2>
      <h3>{`${reservation.first_name} ${reservation.last_name}, Party of ${reservation.people}`}</h3>
      <ErrorAlert error={reservationError} />
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={seatError} />
      <form onSubmit={handleSubmit}>
        {/*name input*/}
        <div className="form-group">
          <label htmlFor="table_id">Table</label>
          <select
            className="form-control"
            id="table_id"
            type="text"
            name="table_id"
            onChange={(event) => {setTable_id(event.target.value);}}
            value={table_id}
            maxLength="50"
            required
          >
            <option value="">--select one--</option>
            {tableOptions}
          </select>
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