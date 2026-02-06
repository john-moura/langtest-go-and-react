CREATE TABLE IF NOT EXISTS test_parts (
    id SERIAL PRIMARY KEY,
    test_id INTEGER NOT NULL,
    title VARCHAR(500) NOT NULL,
    part_type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS descriptions (
    id SERIAL PRIMARY KEY,
    test_part_id INTEGER NOT NULL,
    index VARCHAR(10) NOT NULL,
    text TEXT NOT NULL,
    header VARCHAR(255) NOT NULL,
    subheader VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    test_part_id INTEGER NOT NULL,
    index VARCHAR(10) NOT NULL,
    header VARCHAR(255) NOT NULL,
    subheader VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    index VARCHAR(10), -- Added index column although not currently selected in Go code, to match JSON data
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
