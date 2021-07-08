import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationNew() {

    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const [people, setPeople] = useState(1);
    const [reservationsError, setReservationsError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReservation = {
            "first_name": firstName,
            "last_name": lastName,
            "mobile_number": mobileNumber,
            "reservation_date": reservationDate,
            "reservation_time": reservationTime,
            "people": Number(people),
        }
        createReservation(newReservation)
        .then((result) => {
                console.log("submitted");
                console.log(result);
                history.push(`/dashboard?date=${reservationDate}`)
            })
            .catch(setReservationsError)
    }



    return(
        <>
      <h2> New Reservation</h2>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={handleSubmit}>
        {/*name input*/}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            id="firstName"
            type="text"
            name="first_name"
            onChange={(event) => {setFirstName(event.target.value);}}
            value={firstName}
            maxLength="50"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            id="lastName"
            type="text"
            name="last_name"
            onChange={(event) => {setLastName(event.target.value);}}
            value={lastName}
            maxLength="50"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number (xxx-xxx-xxxx)</label>
          <input
            className="form-control"
            id="mobileNumber"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="mobile_number"
            onChange={(event) => {setMobileNumber(event.target.value);}}
            value={mobileNumber}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservationDate">Reservation Date</label>
          <input
            className="form-control"
            id="reservationDate"
            type="date"
            name="reservation_date"
            onChange={(event) => {setReservationDate(event.target.value);}}
            value={reservationDate}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservationTime">Reservation Time</label>
          <input
            className="form-control"
            id="reservation_time"
            type="time"
            name="reservationTime"
            onChange={(event) => {setReservationTime(event.target.value);}}
            value={reservationTime}
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
            onChange={(event) => {setPeople(event.target.value);}}
            value={people}
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