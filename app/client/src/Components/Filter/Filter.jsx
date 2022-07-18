import React, {useContext, useState} from 'react';
import {Button, Card, Dropdown, DropdownButton, Form, InputGroup} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

import './Filter.css'

const Filter = observer(() => {
    const {rows} = useContext(Context)

    const filterArr = async (e) => {
        e.preventDefault()
        if (rows.filterValue !== "") {
            switch(rows.filterCondition) {
                case '==':
                    rows.setSortedRows(rows.rows.filter(function (filterValue){
                        return filterValue[rows.filterColumn] == rows.filterValue
                    }))
                    rows.setCurrentPage(1)
                    break;
                case 'include':
                    const includeArr = []
                    rows.rows.forEach(row => {
                        if(row[rows.filterColumn].toString().toLowerCase().includes(rows.filterValue.toString().toLowerCase())) {
                            includeArr.push(row)
                        }
                    })
                    rows.setSortedRows(includeArr)
                    rows.setCurrentPage(1)
                    break;
                case '>':
                    const overArr = []
                    rows.rows.forEach(row => {
                        if(row[rows.filterColumn] > rows.filterValue) {
                            overArr.push(row)
                        }
                    })
                    rows.setSortedRows(overArr)
                    rows.setCurrentPage(1)
                    break;
                case '<':
                    const lessArr = []
                    rows.rows.forEach(row => {
                        if(row[rows.filterColumn] < rows.filterValue) {
                            lessArr.push(row)
                        }
                    })
                    rows.setSortedRows(lessArr)
                    rows.setCurrentPage(1)
                    break;
                default:
            }
        }
        else {
            rows.setSortedRows(rows.rows)
        }
    }

    return (
        <div className="ms-lg-4 col-lg-4 mb-3 mb-lg-0">
            <h1>Filters</h1>
            <Card className="">
                <Card.Body>
                    <form onSubmit={filterArr}>
                        <DropdownButton
                            className="mb-2"
                            variant="outline-secondary"
                                title={ rows.filterColumn? rows.filterColumn : "Column" }
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item
                                onClick={()=> {
                                    rows.setfilterColumn('col_name')
                                    rows.setfilterCondition(null)
                                }}>
                                Name
                            </Dropdown.Item>
                            <Dropdown.Item onClick={()=> rows.setfilterColumn('col_count')}>Count</Dropdown.Item>
                            <Dropdown.Item onClick={()=> rows.setfilterColumn('col_distance')}>Distance</Dropdown.Item>
                        </DropdownButton>

                        {rows.filterColumn?
                            <DropdownButton
                            className="mb-2"
                            variant="outline-secondary"
                            title={"Condition: " +rows.filterCondition || "Condition"}
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item onClick={()=> rows.setfilterCondition('==')}>Equals</Dropdown.Item>
                            <Dropdown.Item onClick={()=> rows.setfilterCondition('include')}>Include</Dropdown.Item>
                                {rows.filterColumn !== "col_name" &&
                                    <Dropdown.Item onClick={()=> rows.setfilterCondition('>')}>Over</Dropdown.Item>
                                }
                                {rows.filterColumn !== "col_name" &&
                                    <Dropdown.Item onClick={()=> rows.setfilterCondition('<')}>Less then</Dropdown.Item>
                                }
                        </DropdownButton> : <></>}

                        {rows.filterCondition?
                            <InputGroup >
                                <Form.Control
                                    placeholder="Value to filter"
                                    aria-label="Value to filter"
                                    aria-describedby="Value to filter"
                                    value={rows.filterValue} onChange={e => {
                                    rows.setfilterValue(e.target.value)
                                }}
                                />
                            </InputGroup>
                            :
                            <></>
                        }

                        <Button
                            className="mt-2"
                            variant="outline-secondary"
                            type="submit">
                            Filter
                        </Button>
                    </form>
                    <div className="d-flex flex-rows justify-content-between mt-2 w-100">
                        <h6 className="d-flex align-items-center m-0">Rows per page:</h6>
                        <DropdownButton
                            variant="outline-secondary"
                            title={rows.rowsPerPage}
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item onClick={() => rows.setRowsPerPage(1)}>1</Dropdown.Item>
                            <Dropdown.Item onClick={() => rows.setRowsPerPage(5)}>5</Dropdown.Item>
                            <Dropdown.Item onClick={() => rows.setRowsPerPage(10)}>10</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => {
                                rows.setRowsPerPage(rows.sortedRows.length)
                                rows.setCurrentPage(1)
                            }}>{rows.sortedRows.length}</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
});

export default Filter;