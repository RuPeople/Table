import React, {useState, useEffect} from 'react';
import { Container} from "react-bootstrap";
import Table_bamf from "./Components/Table/Table_bamf";
import Filter from "./Components/Filter/Filter";

import './App.css'

const App = () => {

    return (
        <Container style={{height:window.innerHeight}} className="d-flex flex-row justify-content-center align-items-center">
                <div className="d-flex flex-column-reverse flex-lg-row w-100">
                    <Table_bamf/>
                    <Filter/>
                </div>
        </Container>
    );
}
export default App
