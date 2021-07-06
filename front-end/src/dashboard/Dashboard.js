import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router-dom"; 
import ReservationCard from "../reservations/ReservationCard";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
    let query = useQuery();
    date = query.get("date") || date;

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
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row" >
        {displayReservations}
      </div>
    </main>
  );
}

export default Dashboard;
