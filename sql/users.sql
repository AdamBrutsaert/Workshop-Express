CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    age SMALLINT UNSIGNED
)