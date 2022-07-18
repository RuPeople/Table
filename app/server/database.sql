CREATE DATABASE welbex;

CREATE TABLE welbex_table(
    id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    count int(255),
    distance int(255)
)