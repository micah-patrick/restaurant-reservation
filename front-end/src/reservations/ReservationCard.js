import React from "react";

export default function ReservationCard({reservation}) {

    const first_name = reservation.first_name;
    const last_name = reservation.last_name;
    const mobile_number = reservation.mobile_number;
    const reservation_date = reservation.reservation_date;
    const reservation_time = reservation.reservation_time;
    const people = reservation.people;
    const created_at = reservation.created_at;
    const updated_at = reservation.updated_at;


    return (
        
        <div className="col">
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{`${first_name} ${last_name}`}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{`Party of ${people}`}</h6>
                    <p className="card-text">{`Mobile Number: ${mobile_number}`}</p>
                    <p className="card-text">{`Reservation Date: ${reservation_date}`}</p>
                    <p className="card-text">{`Reservation Time: ${reservation_time}`}</p>
                    <p className="card-text">{`Created at: ${created_at}`}</p>
                    <p className="card-text">{`Updated at: ${updated_at}`}</p>
                </div>
            </div>
        </div>
    )
}