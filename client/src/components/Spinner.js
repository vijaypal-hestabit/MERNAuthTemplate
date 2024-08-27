import React from "react";
import { FaSpinner } from "react-icons/fa";
import '../styles/spinner.scss'

const Spinner = () => {
    return (
        <span>
            <FaSpinner className="spinner" />
        </span>
    );
};

export default Spinner;