import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
import TableCard from "../tables/TableCard";
import { useHistory } from "react-router-dom";
import useQuery from "../utils/useQuery";
import {previous, next, getDisplayDate} from "../utils/date-time";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  let query = useQuery();
  date = query.get("date") || date;
  const displayDate = getDisplayDate(date);

  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [displayReservations, setDisplayReservations] = useState("");
  const [displayTables, setDisplayTables] = useState("");


  useEffect(loadReservations, [date]);
  useEffect(loadTables, [reservations])

  useEffect(() => {
    setDisplayReservations(
      reservations.map((reservation, index) => {
        return (
          <span key={index}>
            <ReservationCard reservation={reservation} />
          </span>
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  useEffect(() => {
    setDisplayTables(
      tables.map((table, index) => {
        return (
          <span key={index}>
            <TableCard table={table} />
          </span>
        )
      })
      )
  }, [tables])

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
    .then(setReservations)
    .catch(setReservationsError)
    return () => abortController.abort();
  }
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
    .then(setTables)
    .catch(setTablesError);
    return () => abortController.abort();
  }




  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {displayDate.display}</h4>
      </div>
      <div className="d-md-flex mb-3">
        <button className="btn btn-primary mx-1 mb-3"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          <span className="oi oi-chevron-left mr-2" />
          Previous
        </button>
        <button className="btn btn-primary mx-1 mb-3"
          onClick={() => history.push(`/dashboard`)}
        >
          <span className="oi oi-calendar mr-2" />
          Today
        </button>
        <button className="btn btn-primary mx-1 mb-3"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          Next
          <span className="oi oi-chevron-right ml-2" />
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <div className="row" >
        {displayReservations}
      </div>

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <div className="row" >
        {displayTables}
      </div>
    </main>
  );
}

export default Dashboard;
