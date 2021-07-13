import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TableCard({table}) {


    const {table_id, table_name, capacity, reservation_id, created_at, updated_at} = table;

    const [tableStatus, setTableStatus] = useState("Loading...");

    useEffect(() =>{
        if (reservation_id) {
            setTableStatus("Occupied")
        } else {
            setTableStatus("Free")
        }
    }, [table])




    return (
        
        <div className="col">
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{table_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{`Capacity: ${capacity}`}</h6>
                    <p className="card-text">{`Created at: ${created_at}`}</p>
                    <p className="card-text">{`Updated at: ${updated_at}`}</p>
                    <p 
                        className="card-text"
                        data-table-id-status={table.table_id}
                    >
                        {tableStatus}
                    </p>

                    {/* <Link 
                        className="btn btn-primary mx-1 mb-3"
                        to={`/reservations/${reservation_id}/seat`}
                    >
                    <span className="oi oi-check mr-2" />
                    Seat
                    </Link> */}
                </div>
            </div>
        </div>
    )
}