const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const pool = require("./db")

app.use(cors())
app.use(express.json())


//create row
app.post("/rows", async (req,res) => {
    try {
        const {col_date, col_name, col_count, col_distance} = req.body
        const newRow = await pool.query(
            "INSERT INTO welbex_table (col_date, col_name, col_count, col_distance) VALUES ($1, $2, $3, $4);",
            [col_date, col_name, col_count, col_distance]
        );
        res.json(newRow.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
});

//get all rows
app.get("/rows", async (req,res) => {
    try {
        const allrows = await pool.query("SELECT * FROM welbex_table ORDER BY col_id ASC");
        res.json(allrows.rows);
        console.log(res.json(allrows.rows))
    }
    catch (err) {
        console.log(err.message);
    }
});
//get single row
app.get("/rows/:id", async (req, res) => {
    try {
        const {id} = req.params
        const row = await pool.query("SELECT * FROM welbex_table WHERE col_id = $1", [id])
        res.json(row.rows[0])
    }
    catch (err) {
        console.log(err.message);
    }
});

//update row
app.put("/rows/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { col_name, col_date, col_count, col_distance } = req.body;
        const row = await pool.query("UPDATE welbex_table SET col_name = $1, col_date = $2, col_count = $3, col_distance = $4 WHERE col_id = $5",
            [col_name, col_date, col_count, col_distance, id]);
        res.json("Row was updated")
    }
    catch (err) {
        console.log(err.message);
    }
});

//delete row
app.delete("/rows/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const row = await pool.query("DELETE FROM welbex_table WHERE col_id = $1",
            [id]);
        res.json("Row was deleted")
    }
    catch (err) {
        console.log(err.message);
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
