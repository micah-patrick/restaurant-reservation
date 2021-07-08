import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
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

    console.log(displayDate);

  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [displayReservations, setDisplayReservations] = useState("");


  useEffect(loadDashboard, [date]);

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

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
      <div className="row" >
        {displayReservations}
      </div>
    </main>
  );
}

export default Dashboard;
