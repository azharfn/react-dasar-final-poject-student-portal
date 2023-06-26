import React from "react";
import { Link } from "react-router-dom";
import "../style.css"

const Home = () => {
    return (
        <>
            <div className="home-container">
                <div className="home-item-a">
                    <h1>Studi Independen Kampus Merdeka</h1>
                    <h5>By Ruang guru</h5>
                </div>
                <div className="home-item-b">
                    <h2>Welcome to Student Portal</h2>
                </div>
                <button>
                    <Link to="/student" data-testid="student-btn" className='btn-all'>
                        All Student
                    </Link>
                </button>
            </div>

        </>
    );
};

export default Home;
