import React, {useContext} from 'react';
import {observer} from "mobx-react-lite"

import {Pagination} from "react-bootstrap";
import {Context} from "../../index";

import './Pagination.css'

const PaginationBamf = observer(({paginate}) => {

    const {rows} = useContext(Context)

    const pageCount = Math.ceil(rows.sortedRows.length / rows.rowsPerPage)
    const pages = []

    for (let i=0; i<pageCount; i++) {
        pages.push(i+1)
    }

    return (
        <>
            {pages.length > 1 &&
                <Pagination className="d-flex justify-content-center mt-2">
                    {pages.map(page =>
                        <Pagination.Item
                            key={page}
                            active={rows.currentPage === page}
                            onClick={()=> paginate(page)}
                        >
                            {page}
                        </Pagination.Item>
                    )}
                </Pagination>
            }
        </>
    );
});

export default PaginationBamf;
