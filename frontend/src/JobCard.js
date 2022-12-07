import React from "react";
import { Link } from "react-router-dom";
import './JobCard.css'

const JobCard = ({ companyHandle, companyName, equity, salary, title }) => {
    return (
        <div className="jobCard">
            <h3>{title} at <small><Link to={`/companies/${companyHandle}`}>{companyName}</Link></small></h3>
            {salary && <p>Salary: {`$${salary.toLocaleString()}`}</p>}
            {equity > 0 && <p>Equity: {equity}</p>}
        </div>
    )
}

export default JobCard;