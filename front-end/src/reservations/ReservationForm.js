import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation, readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router-dom";

export default function ReservationForm({editMode}) {

    const history = useHistory();

  
      const reservation_id = useParams().reservation_id;
    

    let reservationInit = {
      "first_name": "",
      "last_name": "",
      "mobile_number": "",
      "reservation_date": "",
      "reservation_time": "",
      "people": 1,
    }

    const [resState, setResState] = useState(reservationInit);

    const [reservationError, setReservationError] = useState(null);

    useEffect(() => {
      if(editMode){
        loadReservation()
      }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loadReservation() {
        const abortController = new AbortController();
        setReservationError(null);
        readReservation(reservation_id, abortController.signal)
        .then(setResState)
        .catch(setReservationError);
        return () => abortController.abort();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(editMode){
          const updatedReservation = {
            ...resState,
            "people": Number(resState.people),
            "updated_at": new Date()
          }

          const abortController = new AbortController();
          setReservationError(null);
          updateReservation(updatedReservation, reservation_id, abortController.signal)
          .then(() => {
                  history.push(`/dashboard?date=${resState.reservation_date}`)
              })
              .catch(setReservationError)
              return () => abortController.abort();
        }
        else {
          const newReservation = {
              ...resState,
              "people": Number(resState.people),
              "status": "booked"
          }
          const abortController = new AbortController();
          setReservationError(null);
          createReservation(newReservation, abortController.signal)
          .then(() => {
                  history.push(`/dashboard?date=${resState.reservation_date}`)
              })
              .catch(setReservationError)
              return () => abortController.abort();
        }
    }

    const phoneFieldHandler = (event) => {
      let input = event.target.value;
      if(input.length === 10){
          input = input[0]+input[1]+input[2]+"-"+input[3]+input[4]+input[5]+"-"+input[6]+input[7]+input[8]+input[9]
      }
      setResState((current) => ({...current, mobile_number: input})); 
  }



    return(
        <>
      <h2> New Reservation</h2>
      <ErrorAlert error={reservationError} />
      <form onSubmit={handleSubmit}>
        {/*name input*/}
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            className="form-control"
            id="first_name"
            type="text"
            name="first_name"
            onChange={(event) => {setResState((current) => ({...current, first_name: event.target.value})); }}
            value={resState.first_name}
            maxLength="50"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            className="form-control"
            id="last_name"
            type="text"
            name="last_name"
            onChange={(event) => {setResState((current) => ({...current, last_name: event.target.value})); }}
            value={resState.last_name}
            maxLength="50"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobil_number">Mobile Number (xxx-xxx-xxxx)</label>
          <input
            className="form-control"
            id="mobile_number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="mobile_number"
            onChange={phoneFieldHandler}
            value={resState.mobile_number}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            className="form-control"
            id="reservation_date"
            type="date"
            name="reservation_date"
            onChange={(event) => {setResState((current) => ({...current, reservation_date: event.target.value})); }}
            value={resState.reservation_date}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            className="form-control"
            id="reservation_time"
            type="time"
            name="reservation_time"
            onChange={(event) => {setResState((current) => ({...current, reservation_time: event.target.value})); }}
            value={resState.reservation_time}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">People</label>
          <input
            className="form-control"
            id="people"
            type="number"
            name="people"
            onChange={(event) => {setResState((current) => ({...current, people: event.target.value})); }}
            value={resState.people}
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