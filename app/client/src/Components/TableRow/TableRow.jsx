import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {Context} from "../../index";

import './TableRow.css'


//элемент строки таблицы
const TableRow = ({currentRows}) => {

    const {rows} = useContext(Context)

    const deleteRow = async id => {
        try {
            const deleteRow = await fetch(`http://localhost:5000/rows/${id}`,{
                method: "DELETE"
            })
            rows.setSortedRows(rows.sortedRows.filter(row => row.col_id !== id))
        }
        catch (err) {
            console.error(err.message)
        }
    }
    return (
        <>
            {currentRows.map(row => (
                <tr className="table__row" key={row.col_id}>
                    <td className="col-3">{row.col_date}</td>
                    <td className="col-3">{row.col_name}</td>
                    <td className="col-3">{row.col_count}</td>
                    <td className="col-3">{row.col_distance} km</td>
                    <td className="col-3">
                        <Button
                            onClick={() => {
                                deleteRow(row.col_id)
                            }}
                            className="table__row_button d-flex justify-content-center align-items-center p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-x" viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </Button>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default TableRow;