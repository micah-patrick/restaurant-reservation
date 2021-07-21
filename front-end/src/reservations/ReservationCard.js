import React, { useEffect, useState } from "react";
import {getDisplayDate} from "../utils/date-time";
import { Link } from "react-router-dom";

export default function ReservationCard({reservation}) {


    const {reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people, created_at, updated_at, status} = reservation;
    const displayDate = getDisplayDate(reservation_date);

    const [seatButton, setSeatButton] = useState("");

    useEffect(() => {
        if (status === "booked") {
            setSeatButton(
                <Link 
                className="btn btn-primary mx-1 mb-3"
                to={`/reservations/${reservation_id}/seat`}
            >
                <span className="oi oi-people mr-2" />
                Seat
            </Link>
            )
        } else {
            setSeatButton("")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        
        <div className="col">
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{`${first_name} ${last_name}`}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{`Party of ${people}`}</h6>
                    <p className="card-text">{`Mobile Number: ${mobile_number}`}</p>
                    <p className="card-text">{`Reservation Date: ${displayDate.display}`}</p>
                    <p className="card-text">{`Reservation Time: ${reservation_time}`}</p>
                    <p className="card-text">{`Created at: ${created_at}`}</p>
                    <p className="card-text">{`Updated at: ${updated_at}`}</p>
                    <p className="card-text" data-reservation-id-status={reservation_id}>{`Status: ${status}`}</p>
                    {seatButton}
                </div>
            </div>
        </div>
    )
}

