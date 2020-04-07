import React from 'react';
import { Link } from 'react-router-dom';
import '../css/404.css';

function P404() {
    return (
        <div style={{ backgroundColor: "#282c34", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div>
                <h1>404 Not found</h1>
                <Link to="/">Click here to go to homepage.</Link>
            </div>
        </div>
    );
}

export default P404;