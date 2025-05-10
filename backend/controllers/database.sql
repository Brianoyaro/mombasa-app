create database if not esists mombasa-app;
use mombasa-app;

-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(15),
    role VARCHAR(20) DEFAULT 'user', -- 'user' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REPORTS
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    department_id INTEGER REFERENCES departments(id),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IMAGES
CREATE TABLE report_images (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VOTES
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vote_type VARCHAR(10) CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Ensure that a user can only vote once per report
    UNIQUE (report_id, user_id) -- Each user can only vote once per report
);

-- COMMENTS
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALERTS
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high')),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DEPARTMENTS
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    contact_info TEXT
);

-- REPORT-DEPARTMENT ASSIGNMENTS (optional many-to-many)
CREATE TABLE report_departments (
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    PRIMARY KEY (report_id, department_id)
);
