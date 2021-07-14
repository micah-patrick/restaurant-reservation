import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { unassignTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


export default function TableCard({table, tablesUpdated}) {

    const {table_id, table_name, capacity, reservation_id, created_at, updated_at} = table;
    const history = useHistory();


    const [tableStatus, setTableStatus] = useState("Loading...");
    const [finishButtonDisplay, setFinishButtonDisplay] = useState("");
    const [seatError, setSeatError] = useState(null);


    useEffect(() =>{
        if (reservation_id) {
            setTableStatus("Occupied")
            setFinishButtonDisplay(
                <button 
                    className="btn btn-primary mx-1 mb-3"
                    data-table-id-finish={table_id}
                    to={`/reservations/`}
                    onClick={handleSubmit}
                >
                    <span className="oi oi-check mr-2" />
                    Finish
                </button>
            )
        } else {
            setTableStatus("Free")
            setFinishButtonDisplay("")
        }
    }, [table, reservation_id, table_id])

    const handleSubmit = (event) => {
        event.preventDefault();
        const message = `Is this table ready to seat new guests? This cannot be undone.`;
        if(window.confirm(message)) {
            const abortController = new AbortController();
            setSeatError(null);
            unassignTable( table_id, abortController.signal)
            .then(() => { tablesUpdated() })
            .catch(setSeatError);
            return () => abortController.abort();
        }
    }




    return (
        
        <div className="col">
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{table_name}</h5>
                    <ErrorAlert error={seatError} />
                    <h6 className="card-subtitle mb-2 text-muted">{`Capacity: ${capacity}`}</h6>
                    <p className="card-text">{`Created at: ${created_at}`}</p>
                    <p className="card-text">{`Updated at: ${updated_at}`}</p>
                    <p 
                        className="card-text"
                        data-table-id-status={table.table_id}
                    >
                        {tableStatus}
                    </p>
                    {finishButtonDisplay}
                </div>
            </div>
        </div>
    )
}