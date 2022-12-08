import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import loginContext from "../loginContext";
import './JobCard.css'

const JobCard = ({ id, companyHandle, companyName, equity, salary, title }) => {
    const {user, applications, addApplication} = useContext(loginContext);
    const [applied, apply] = useState(applications.includes(id));

    //when the button is clicked, apply for the job
    const handleClick = e => {
        //on the off chance the button isn't disabled for some reason, just do nothing
        if(applied) return;
        addApplication(id);
        apply(true);
    }
    return (
        <div className="jobCard">
            <h3>{title} at <small><Link to={`/companies/${companyHandle}`}>{companyName}</Link></small></h3>
            {salary && <p>Salary: {`$${salary.toLocaleString()}`}</p>}
            {equity > 0 && <p>Equity: {equity}</p>}
            <button disabled={applied} onClick={handleClick}>{applied ? "Applied" : "Apply"}</button>
        </div>
    )
}

export default JobCard;