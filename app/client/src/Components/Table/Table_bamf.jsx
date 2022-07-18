import {Button, Table} from "react-bootstrap";

import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {fetchRows} from "../../http/dataApi";
import Pagination_bamf from "../Pagination/Pagination_bamf";
import Filter from "../Filter/Filter";
import TableInput from "../TableInput/TableInput";
import {Context} from "../../index";
import TableRow from "../TableRow/TableRow";

import './Table_bamf.css'



const Table_bamf = observer(() => {

    const {rows} = useContext(Context)

    const lastRowIndex = rows.currentPage * rows.rowsPerPage
    const firstRowIndex = lastRowIndex - rows.rowsPerPage
    const currentRows = rows.sortedRows.slice(firstRowIndex, lastRowIndex)

    //получаем строки и сортируем
    useEffect(() => {
        fetchRows().then(data => {
            rows.setRows(data)
            const sorted = [...rows.rows].sort((a,b) => a["col_name"].toLowerCase() > b["col_name"].toLowerCase() ? 1:-1)
            rows.setSortedRows(sorted)
        })
    },[])


    //сортировка по колонкам
    const [order, setOrder] = useState("ASC")
    const sortByColumn = (column) => {
        if (column === "col_name") {
            //сортировка для string
            if (order === "ASC") {
                const sorted = [...rows.sortedRows].sort((a,b) => a[column].toLowerCase() > b[column].toLowerCase() ? 1:-1)
                rows.setSortedRows(sorted)
                setOrder("DSC")
            }
            if (order === "DSC") {
                const sorted = [...rows.sortedRows].sort((a,b) => a[column].toLowerCase() < b[column].toLowerCase() ? 1:-1)
                rows.setSortedRows(sorted)
                setOrder("ASC")
            }
        }
        else {
            //сортировка для number
            if (order === "ASC") {
                const sorted = [...rows.sortedRows].sort((a,b) => a[column] - b[column])
                rows.setSortedRows(sorted)
                setOrder("DSC")
            }
            if (order === "DSC") {
                const sorted = [...rows.sortedRows].sort((a,b) => b[column] - a[column])
                rows.setSortedRows(sorted)
                setOrder("ASC")
            }
        }
    }



    //пагинация
    const paginate = pageNumber => rows.setCurrentPage(pageNumber)

    return (
        <div className="d-flex flex-row">
            <div>
                <TableInput/>
                <Table className="my-auto" striped bordered hover>
                    <thead>
                        <tr>
                        <th>
                            Date
                        </th>
                        <th style={{cursor: "pointer"}} onClick={() => sortByColumn("col_name")}>
                            Name
                        </th>
                        <th style={{cursor: "pointer"}} onClick={() => sortByColumn("col_count")}>
                            Count
                        </th>
                        <th style={{cursor: "pointer"}} onClick={() => sortByColumn("col_distance")}>
                            Distance
                        </th>
                        <th>
                            del
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <TableRow currentRows={currentRows} />
                    </tbody>
                </Table>
                <Pagination_bamf paginate={paginate}/>
            </div>
        </div>
    );
});

export default Table_bamf;