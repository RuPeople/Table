import React, {useContext, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchRows} from "../../http/dataApi";

import './TableInput.css'

const TableInput = observer(() => {
    const {rows} = useContext(Context)

    const [col_date, setDate] = useState('0000-00-00')
    const [col_name, setName] = useState('')
    const [col_count, setCount] = useState(0)
    const [col_distance, setDistance] = useState(0)

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {col_date, col_name, col_count, col_distance}
            const response = await fetch("http://localhost:5000/rows",
                {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body)
                });
            fetchRows().then(data => {
                rows.setRows(data)
                const sorted = [...rows.rows].sort((a,b) => a["col_name"].toLowerCase() > b["col_name"].toLowerCase() ? 1:-1)
                rows.setSortedRows(sorted)
            })
            console.log(response)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="table-input">
            <h1>Input</h1>
            <form onSubmit={onSubmitForm}>
                <InputGroup className="table-input__group mb-2">
                    <Form.Control
                        className="table-input__group_input"
                        placeholder="date"
                        aria-label="date"
                        aria-describedby="date"
                        type="date"
                        value={col_date}
                        onChange={e =>  setDate(e.target.value)}
                    />
                    <Form.Control
                        className="table-input__group_input"
                        placeholder="name"
                        aria-label="name"
                        aria-describedby="name"
                        type="text"
                        value={col_name}
                        onChange={e =>  setName(e.target.value)}
                    />
                    <Form.Control
                        className="table-input__group_input"
                        placeholder="count"
                        aria-label="count"
                        aria-describedby="count"
                        type="number"
                        value={col_count}
                        onChange={e =>  setCount(e.target.value)}
                    />
                    <Form.Control
                        className="table-input__group_input"
                        placeholder="distance"
                        aria-label="distance"
                        aria-describedby="distance"
                        type="number"
                        value={col_distance}
                        onChange={e =>  setDistance(e.target.value)}
                    />
                    <Button
                        className="table-input__group_button"
                        variant="outline-secondary"
                        type="submit"
                    >
                        Add row
                    </Button>
                </InputGroup>
            </form>

        </div>
    );
});

export default TableInput;