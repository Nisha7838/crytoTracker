import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";


import "./Navbar.css";

function Navbar(props) {
    return (
        <div>
            <div className="container">
                <nav className="navbar">
                    <h3 className="logo_name">Crypto Tracker</h3>
                    <div className="nav-symbol py-4">
                        <div>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
