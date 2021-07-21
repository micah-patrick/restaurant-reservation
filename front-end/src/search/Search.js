import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import ReservationCard from "../reservations/ReservationCard";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Search() {

    const [searchInput, setSearchInput] = useState("");
    const [searchError, setSearchError] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [displayReservations, setDisplayReservations] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        loadReservations();
    }

    useEffect(() => {
        if (reservations.length){
            setDisplayReservations(
              reservations.map((reservation, index) => {
                return (
                  <span key={index}>
                    <ReservationCard reservation={reservation} />
                  </span>
                );
              })
            );
        } else {
            setDisplayReservations(
                <h3>No reservations found</h3>
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [reservations]);

    const searchFieldHandler = (event) => {
        let input = event.target.value.replace(/\D/g, "");
        setSearchInput(input.slice(0,10))
    }

    function loadReservations() {
        const abortController = new AbortController();
        setSearchError(null);
        listReservations({ "mobile_number": searchInput }, abortController.signal)
        .then(setReservations)
        .catch(setSearchError)
        return () => abortController.abort();
    }

    return (
        <>
        <h2>Search</h2>
        <ErrorAlert error={searchError} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="searchInput">Mobile Number</label>
            <input
              className="form-control"
              id="searchInput"
              type="text"
              name="searchInput"
              onChange={searchFieldHandler}
              value={searchInput}
              maxLength="50"
              required
              placeholder="Enter a customer's phone number"
            />
          </div>
          
          {/*submit button*/}
          <button className="btn btn-primary mx-1 mb-3" type="submit">
            <span className="oi oi-magnifying-glass mr-2" />
            Find
          </button>
  
        </form>

        <div className="row" >
            {displayReservations}
        </div>
        </>
    )
}