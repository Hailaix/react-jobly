import React from "react";
import './JobCard.css'

const JobCard = ({ job }) => {
    return (
        <div className="jobCard">
            <h3>{job.title}</h3>
            {job.salary && <p>Salary: {`$${job.salary.toLocaleString()}`}</p>}
            {job.equity >= 0 && <p>Equity: {job.equity}</p>}
        </div>
    )
}

export default JobCard;