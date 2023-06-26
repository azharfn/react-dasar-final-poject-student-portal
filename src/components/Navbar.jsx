import React from 'react';
import { Link } from 'react-router-dom';
import "../style2.css"

function Navbar() {
    return (
        <nav>
            <h1 data-testid="home-page">
                <Link to="/" data-testid="student-btn">Student Portal</Link>
            </h1>
            <ul>
                <li>
                    <Link to="/student" data-testid="student-page">
                        All Student
                    </Link>
                </li>
                <li>
                    <Link to="/add" data-testid="add-page">
                        Add Student
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
